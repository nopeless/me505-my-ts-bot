import fs from "fs"
import path from "path"
import { fileURLToPath, pathToFileURL } from "url"

import { Client, GatewayIntentBits } from "discord.js"
import * as dotenv from "dotenv"

import { EventModule } from "./types.js"
import { matchNonIndexJsTs } from "./util.js"

dotenv.config()

const __dirname = fileURLToPath(new URL('.', import.meta.url));

console.log(__dirname)

const Intents: GatewayIntentBits[] = [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent
]
const bot = new Client({ intents: Intents })

// event handeler
const eventPath = path.join(__dirname, "events");
const eventFiles = fs.readdirSync(eventPath).filter(matchNonIndexJsTs);

async function registerEventModuleFile(file: string) {
  const uri = pathToFileURL(path.resolve(eventPath, file)).href;
  const event: EventModule = (await import(uri)).default;
  
  console.log(event, event["name"])
  
  bot[event.once ? "once" : "on"](event.name, event.execute);
}

await Promise.all(eventFiles.map(file => registerEventModuleFile(path.join(eventPath, file))))

bot.login(process.env.BOT_TOKEN)
