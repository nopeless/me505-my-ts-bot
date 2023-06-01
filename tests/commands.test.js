"use strict";
const { Client, Message } = require('discord.js');
const jest = require("jest");
jest.describe('add command', () => {
    let client;
    let message;
    jest.beforeEach(() => {
        client = new Client({ intents: 7796 });
        message = {
            content: '/ping',
            reply: jest.fn(),
        };
    });
    jest.afterEach(() => {
        jest.clearAllMocks();
    });
    jest.it('should reply with pong!', () => {
    }, jest.expect(message.reply).toHaveBeenCalledWith('pong!'));
});
;
