"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const fs = require("fs");
const path = require("path");
exports.default = {
    name: discord_js_1.Events.MessageCreate,
    execute(msg) {
        return __awaiter(this, void 0, void 0, function* () {
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
                    console.log(target_command_path);
                    console.log(commandFiles[i]);
                    const command = require(target_command_path);
                    console.log(command);
                    yield command.execute(msg);
                }
            }
        });
    }
};
