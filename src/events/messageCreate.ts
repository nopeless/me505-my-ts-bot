import { Events, Message } from "discord.js"
import { readdirSync } from "fs"
const commandsPath = "/data/data/com.termux/files/home/my-ts-bot/dist/commands"
let Default = {
  name: Events.MessageCreate,
  async execute(msg: Message,) {
    // command handeler
    if (!msg.content.startsWith("/")) return;
    console.log("/ command revcieved")

    const msgList: string[] = msg.content.split(" ")
    const commandFiles: string[] = (readdirSync(commandsPath) as string[]).filter(file => file.endsWith('.js'));
    for (let i = 0; i < (commandFiles.length); i++) {

      // removes the .js
      var target_file = commandFiles[i].split(".")[0]

      if (msgList[0] == ("/" + target_file)) {
        let target_command_path: string = commandsPath + '/' + commandFiles[i]
        console.log(target_command_path)
        let command = await import(target_command_path)
        console.log(command)
        command = command.default
        await command.execute(msg)

      }
    }
  }
}

export { Default }
