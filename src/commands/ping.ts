const { Message } = require("discord.js");

module.exports = {
  name: "ping",
  async execute(msg: typeof Message) {
    msg.reply("pong!")
  }
}
