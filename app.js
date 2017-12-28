const express    = require('express'),
      bodyParser = require('body-parser'),
      RiveScript = require('rivescript');

const bot = new RiveScript();

bot.loadDirectory('brain', loading_done, loading_fail);

function loading_done(batch_num) {
    console.log(`Batch #${ batch_num } has finished loading`);

    // Now the replies must be sorted
    bot.sortReplies(batch_num);

    const reply = bot.reply("local-user", "Hello, bot!");
    console.log('The human says: Hello, bot!')
    console.log(`The bot says: ${ reply }`);
}

function loading_fail(error) {
    console.log("Error when loading files: " + error);
}