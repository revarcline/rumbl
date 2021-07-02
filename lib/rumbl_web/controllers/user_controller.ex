defmodule RumblWeb.UserController do
  use RumblWeb, :controller

  alias Rumbl.accounts()

  def index(conn, _params) do
    users = Accounts.list_users()
    render(conn, "index.html", users: users)
  end
end
