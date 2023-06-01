"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const fs = require("fs");
const path = require("node:path");
const Intents = [
    discord_js_1.GatewayIntentBits.Guilds,
    discord_js_1.GatewayIntentBits.GuildMessages,
    discord_js_1.GatewayIntentBits.MessageContent
];
const bot = new discord_js_1.Client({ intents: Intents });
// event handeler
const eventPath = path.join(__dirname, "events");
const eventFiles = fs.readdirSync(eventPath).filter(file => file.endsWith('.js'));
console.log(eventFiles);
for (const file of eventFiles) {
    const filePath = path.join(eventPath, file);
    console.log(filePath);
    const event = require(filePath)["default"];
    console.log(event, event["name"]);
    if (event["once"]) {
        bot.once(event["name"], (...args) => { event["execute"](...args); });
    }
    else {
        bot.on(event.name, (...args) => { event.execute(...args); });
    }
}
bot.login(process.env.BOT_TOKEN);
