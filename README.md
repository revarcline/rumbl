# Rumbl

based on [Programming Phoenix](https://medium.com/pragmatic-programmers/table-of-contents-5017d6ee397)

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.setup`
  * Install Node.js dependencies with `npm install` inside the `assets` directory
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](https://hexdocs.pm/phoenix/deployment.html).

## secrets

to hide your postgres info from version control in dev, add a `config/dev.secret.exs` file with the following contents:

```elixir
use Mix.Config

config :rumbl, Rumbl.Repo,
  username: "posgres_user",
  password: "password"
```
