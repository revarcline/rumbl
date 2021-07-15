defmodule RumblWeb.VideoViewTest do
  use RumblWeb.ConnCase, async: true
  import Phoenix.View

  test "renders index.html", %{conn: conn} do
    videos = [
      %Rumbl.Multimedia.Video{id: "1", title: "dogs"},
      %Rumbl.Multimedia.Video{id: "2", title: "cats"}
    ]

    content =
      render_to_string(
        RumblWeb.VideoView,
        "index.html",
        conn: conn,
        videos: videos
      )

    assert String.contains?(content, "Listing Videos")

    for video <- videos do
      assert String.contains?(content, video.title)
    end
  end
end
