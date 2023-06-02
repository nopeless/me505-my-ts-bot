import { Events } from "discord.js";
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
import fs from "fs";
import path from "path";
export default {
    name: Events.MessageCreate,
    async execute(msg) {
        // command handeler
        if (!msg.content.startsWith("/"))
            return;
        console.log("/ command revieved");
        const msgList = msg.content.split(" ");
        const commandsPath = path.join(__dirname + "/../", "commands");
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        for (let i = 0; i < (commandFiles.length); i++) {
            // removes the .js
            var target_file = commandFiles[i].split(".")[0];
            if (msgList[0] == ("/" + target_file)) {
                let target_command_path = commandsPath + '/' + commandFiles[i];
                const command = require(target_command_path);
                await command.execute(msg);
            }
        }
    }
};
