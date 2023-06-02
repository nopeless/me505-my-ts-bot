import { Client, GatewayIntentBits } from "discord.js"
import fs from "fs"
import path from "path"

// make require
import { createRequire } from "module";
const require = createRequire(import.meta.url)
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
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

const eventHandle = async () => {
  for (const file of eventFiles) {
    const filePath: string = path.join(eventPath, file);
    console.log(filePath)
    // const event = require(filePath)
    let event = await import(filePath)
    event = event["default"]
    console.log(event, event["name"])
    if (event["once"]) {
      bot.once(event["name"], (...args) => { event["execute"](...args) });
    } else {
      bot.on(event.name, (...args) => { event.execute(...args) });
    }
  }
}
eventHandle()
bot.login(process.env.BOT_TOKEN)
