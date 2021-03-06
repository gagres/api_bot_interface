const RiveScript = require('rivescript');
const path = require('path');

class NerdBot {
  constructor() {
    this.bot = new RiveScript;

    this._onSuccess = this._onSuccess.bind(this);
    this._onError = this._onError.bind(this);
  }
  init() {
    this.bot.loadDirectory(path.resolve(__dirname, '../', 'brain'), this._onSuccess, this._onError);
  }
  _onSuccess(batch_num) {
    console.log("Batch #" + batch_num + " has finished loading!");

    // The replies must be sorted
    this.bot.sortReplies();
  }
  _onError(error) {
    console.log("Error when loading files: " + error);
    process.exit(1);
  }
  reply(text) {
    // Normalize string (take off accentuation)
    const normalizedText = this.normalize(text);
    const reply = this.bot.reply('local-user', normalizedText);
    return reply;
  }
  normalize(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
  }
}

module.exports = new NerdBot();
