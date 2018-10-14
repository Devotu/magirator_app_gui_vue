# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# Configures the endpoint
config :magirator_app_gui_vue, MagiratorAppGuiVueWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "fNSB9f9xHyO39+7M3gOVw42ncuNjJXvlbf2bLwwXST82U8JV3AFrOWmE/JawrQmb",
  render_errors: [view: MagiratorAppGuiVueWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: MagiratorAppGuiVue.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:user_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
