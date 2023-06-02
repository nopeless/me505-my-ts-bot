const { Message } = require("discord.js");
module.exports = {
    name: "ping",
    async execute(msg) {
        msg.reply("pong!");
    }
};
export {};
