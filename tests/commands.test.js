"use strict";
const { Client, Message } = require('discord.js');
const ping = require('./../src/commands/ping.ts');
describe('ping command', () => {
    let message;
    beforeEach(() => {
        message = {
            content: '/ping',
            reply: jest.fn(),
        };
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should reply with pong!', () => {
        ping.execute(message);
        expect(message.reply).toHaveBeenCalledWith('pong!');
    });
});
