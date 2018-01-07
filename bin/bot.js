const SlackBot = require('../lib/slackbot');
const dotenv = require('dotenv');

// Init dotenv file
dotenv.config();

const settings = {
  token: process.env.API_TOKEN,
  name: process.env.API_NAME || 'nerdbot'
};

const bot = new SlackBot(settings);

bot.run();
