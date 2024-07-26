
//discord bot.
const Discord = require('discord.js-v11'); //using V11 old vertion.
const bot = new Discord.Client();

//import all modules.
const channel = require('./discordObjManager/channel.js');
const user = require('./discordObjManager/user.js');
const role = require('./discordObjManager/role.js');
const guild = require('./discordObjManager/guild.js');
const cmd = require('./cmd/cmd.js');

//------>>

//start.
bot.on('ready', function(){

    //init all modules.
    channel.init(bot);
    guild.init(bot, channel);
    user.init(bot, channel, guild);
    role.init(bot, channel, guild);
    cmd.init(bot, channel, user, role);
    

    //print bot is connected.
    channel.log(
        'Le bot '+bot.user.tag+' est connecté.', //message.
        true //isASuccess.
    );
});

//read new message.
bot.on('message', function(message){

    //skip if it's not a commande.
    if(message.content[0] !== '!')
        return;

    //search a cmd to execute (and get bool success).
    let isSuccess = cmd.searchCmd(message);

    //react to message with marker success or error.
    message.react((isSuccess? '✅': '❌'));
    
});

//------>>

//key for connect to bot discord.
bot.login(process.env['LoginBot']);