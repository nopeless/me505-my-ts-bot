import { Events } from "discord.js"
export default {
  name: Events.ClientReady,
  once: true,
  async execute() {
    console.log("The bot is ready")
  }
}
