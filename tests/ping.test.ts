// import { Message } from 'discord.js';
import { Default } from '../src/commands/ping.ts'
console.log(Default)
describe('ping command', () => {
  let message: any;

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
    Default["execute"](message)
    console.log(message)
    expect(message.reply).toHaveBeenCalledWith('pong!');
  });
});
let Default = { func: describe }
export { Default }
