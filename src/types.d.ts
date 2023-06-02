import { ClientEvents, Message } from "discord.js"

export type CommandModule = {
  name: string,
  // force user to use async
  async execute(msg: Message): Promise<void>;
}

// Later, there is a trick to making this a generic as well
// but I won't go over them
export type EventModule = {
  name: keyof ClientEvents,
  once?: boolean,
  async execute(...args: any[]): Promise<void>;
}
