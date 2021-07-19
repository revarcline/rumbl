import Player from "./player";

const Video = {
  init(socket, element) {
    if (!element) {
      return;
    }
    const playerId = element.getAttribute("data-player-id");
    const videoId = element.getAttribute("data-id");
    socket.connect();
    Player.init(element.id, playerId, () => {
      this.onReady(videoId, socket);
    });
  },

  onReady(videoId, socket) {
    const msgContainer = document.getElementById("msg-container");
    const msgInput = document.getElementById("msg-input");
    const postButton = document.getElementById("msg-submit");
    const vidChannel = socket.channel(`videos:${videoId}`);

    postButton.addEventListener("click", (e) => {
      const payload = { body: msgInput.value, at: Player.getCurrentTime() };
      vidChannel
        .push("new_annotation", payload)
        .receive("error", (e) => console.log(e));
      msgInput.value = "";
    });

    vidChannel.on("new_annotation", (resp) => {
      this.renderAnnotation(msgContainer, resp);
    });
    vidChannel
      .join()
      .receive("ok", ({ annotations }) => {
        this.scheduleMessages(msgContainer, annotations);
      })
      .receive("error", (reason) => console.log("join failed", reason));
  },

  esc(str) {
    const div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  },

  renderAnnotation(msgContainer, { user, body, at }) {
    const template = document.createElement("div");
    template.innerHTML = `
    <a href="#" data-seek="${this.esc(at)}">
      [${this.formatTime(at)}]
      <b>${this.esc(user.username)}</b>: ${this.esc(body)}
    </a>
    `;
    msgContainer.appendChild(template);
    msgContainer.scrollTop = msgContainer.scrollHeight;
  },

  scheduleMessages(msgContainer, annotations) {
    clearTimeout(this.scheduleTimer);
    this.schedulerTimer = setTimeout(() => {
      let ctime = Player.getCurrentTime();
      let remaining = this.renderAtTime(annotations, ctime, msgContainer);
      this.scheduleMessages(msgContainer, remaining);
    }, 1000);
  },

  renderAtTime(annotations, seconds, msgContainer) {
    return annotations.filter((ann) => {
      if (ann.at > seconds) {
        return true;
      } else {
        this.renderAnnotation(msgContainer, ann);
        return false;
      }
    });
  },

  formatTime(at) {
    let date = new Date(null);
    date.setSeconds(at / 1000);
    return date.toISOString().substr(14, 5);
  },
};

export default Video;
