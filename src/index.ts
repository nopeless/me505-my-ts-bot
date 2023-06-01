import { Client, GatewayIntentBits } from "discord.js"
const fs = require("fs")
const path = require("node:path")
const Intents: GatewayIntentBits[] = [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent
]
const bot: Client = new Client({ intents: Intents })

// event handeler
const eventPath: string = path.join(__dirname, "events");
const eventFiles: string[] = (fs.readdirSync(eventPath) as string[]).filter(file => file.endsWith('.js'));
console.log(eventFiles)
for (const file of eventFiles) {
  const filePath: string = path.join(eventPath, file);
  console.log(filePath)
  const event = require(filePath)["default"]
  console.log(event, event["name"])
  if (event["once"]) {
    bot.once(event["name"], (...args) => { event["execute"](...args) });
  } else {
    bot.on(event.name, (...args) => { event.execute(...args) });
  }
}
bot.login(process.env.BOT_TOKEN)
