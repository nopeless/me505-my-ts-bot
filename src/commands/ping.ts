const { Message } = require("discord.js");
let Default = {
  name: "ping",
  async execute(msg: typeof Message) {
    msg.reply("pong!")
    console.log(msg)
  }
}
export { Default }
