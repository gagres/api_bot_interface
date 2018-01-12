const path = require('path');
const fs   = require('fs');
const Bot = require('slackbots');
const NerdBot = require('./nerdbot');

class SlackBot extends Bot {
  constructor(settings) {
    super(settings);
    this.settings = settings;
    this.settings.name = this.settings.name || 'nerdbot';
    this.dbPath = settings.dbPath || path.resolve(process.cwd(), 'data', 'norrisbot.db');

    this.user = null;
    this.db = null;
  }
  run() {
    this.on('start', this._onStart);
    this.on('message', this._onMessage);

    // Init NerdBot
    NerdBot.init();
  }
  _onStart() {
    this._loadBotUser();
    // this._connectDb();
    this._firstRunCheck();
  }
  _loadBotUser() {
    const self = this;
    this.user = this.users.filter(user => user.name === self.name)[0];
  }
  _connectDb() {
    if(!fs.existsSync(this.dbPath)) {
      console.error(`Database path "${ this.dbPath }" does not exists or it\'s not readable.`);
      process.exit(1);
    }

    this.db = new SQLite.Database(this.dbPath);
  }
  _firstRunCheck() {
    const self = this;
    this.postMessageToUser('gagres', 'Hello Gagres!! Vou começar minhas atividades');
  }
  _onMessage(message) {
    if (this._isChatMessage(message) && !this._isNerdBot(message)) {
      this._replyMessage(message);
    }
  }
  _isChatMessage(message) {
    return message.type === 'message' && Boolean(message.text);
  }
  _isChannelConversation(message) {
    return this.channels.find(c => c.id === message.channel);
  }
  _isNerdBot(message) {
    return message.username === this.user.name;
  }
  _isMentioningNerdBot(message) {
    if(message.text)
      return message.text.toLowerCase().indexOf(this.name) > -1;
    else
      return false;
  }
  _replyMessage(message) {
    if(message.text) {
      let reply = NerdBot.reply(message.text);

      if(reply === 'ERR: No Reply Matched') {
        reply = NerdBot.reply('no reply');
      }

      const channel = this.channels.find(channel => channel.id === message.channel);
      const user = this.users.find(user => user.id === message.user);

      if(channel)
        return this.postMessageToChannel(channel.name, reply);
      else if(user)
        return this.postMessageToUser(user.name, reply);
    }
  }
}

module.exports = SlackBot;
