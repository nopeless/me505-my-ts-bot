import { Message } from "discord.js";
import { CommandModule } from "../types.js";

export default {
  name: "ping",
  async execute(msg: Message) {
    msg.reply("pong!");
  }
} satisfies CommandModule
