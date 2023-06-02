import { Events, Message } from "discord.js"
import { readdirSync } from "fs"
import path from "path"
import { CommandModule, EventModule } from "../types.js";
import { fileURLToPath, pathToFileURL } from "url";
import { matchNonIndexJsTs } from "../util.js";

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// use relative paths
const commandsPath = path.join(__dirname, "../commands");

// create mapping ahead of time
// top level await is possible in esm

async function createModuleMapping() {
  const moduleMapping = new Map<string, CommandModule>();
  
  const commandFiles = readdirSync(commandsPath).filter(matchNonIndexJsTs);

  const moduleImports: Promise<void>[] = []

  for (const commandFile of commandFiles) {
    // use path.parse().name as it is a more standard api
    const baseName = path.parse(commandFile).name;

    const uri = pathToFileURL(path.resolve(commandsPath, commandFile)).href;

    const mi = import(uri).then(
      (module: { default: CommandModule }) => {
        moduleMapping.set(baseName, module.default);
      }
    )

    moduleImports.push(mi)
  }

  await Promise.all(moduleImports);

  return moduleMapping;
}

const moduleMapping = await createModuleMapping();

export default {
  name: Events.MessageCreate,
  async execute(msg: Message) {
    // command handeler
    if (!msg.content.startsWith("/")) return;
    console.log("/ command received")

    const [command] = msg.content.match(/\/\S+/) ?? [];
    if (!command) return;

    console.log(moduleMapping)

    // execute if command exists
    moduleMapping.get(command.slice(1))?.execute(msg);
  }
} satisfies EventModule
