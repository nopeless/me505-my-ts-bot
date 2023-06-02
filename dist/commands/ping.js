const { Message } = require("discord.js");
export default {
    name: "ping",
    async execute(msg) {
        msg.reply("pong!");
    }
};
