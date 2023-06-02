import { Events } from "discord.js"
import { EventModule } from "../types.js"

export default {
  name: Events.ClientReady,
  once: true,
  async execute() {
    console.log("The bot is ready")
  }
} satisfies EventModule
