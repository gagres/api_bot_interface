const SlackBot = require('../lib/slackbot');
const TerminalBot = require('../lib/terminalbot');

// const settings = {
//   token: process.env.API_TOKEN,
//   name: process.env.API_NAME || 'nerdbot'
// };
//
// const bot = new SlackBot(settings);

// bot.run();

const terminal = new TerminalBot();

terminal.run();
