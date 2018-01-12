const NerdBot = require('./nerdbot');
const path = require('path');
const fs   = require('fs');
const readline = require('readline');

class TerminalBot {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    });
  }
  run() {
    // Init NerdBot (rivescript logic)
    NerdBot.init();
    // Terminal stdin logi
    this.readLine();
  }
  readLine() {
    this.rl.on('line', (message) => {
      const reply = NerdBot.reply(message);

      console.log('\x1b[33m%s\x1b[0m', 'Bots says', reply);  // red
    })
  }
}

module.exports = TerminalBot;
