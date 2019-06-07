require('dotenv').config({path: __dirname + '/ENVIRONMENT.env'});
const command = require('./commands/command.js');
const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require('node-fetch');

client.on('ready', () => {
    for(user of client.users) {
        if(!user[1].bot) {
            command.addUser(user[1].tag);
        }
    }
});

client.on('guildMemberAdd', (member) => {
    const channel = member.guild.channels.find(ch => ch.name === 'member-log');
    if(!channel) {
        return;
    }
    channel.send('Welcome to the merit system, ${member}');
    command.addUser(member);
});

client.on('message', (msg) => {
    if(msg.content.charAt(0) === '!') {
        let commandString = msg.content.split(' ');
        
        if(msg.mentions.users.first()) {
            commandString[1] = msg.mentions.users.first().username;
        }
        else {
            msg.reply('No valid user');
            return;
        }
        commandString[0] = commandString[0].substring(1);

        if(commandString[0] === 'merits' || commandString[0] === 'demerits') {
            if(commandString.length === 2) {
                command.getMerits(commandString[1], (res) => {
                    msg.reply(res); 
                });
            }
            else if(commandString.length === 3) {
                if(typeof(parseInt(commandString[2], 10)) != 'number') {
                    msg.reply('Enter a valid number');
                    return;
                }
                command.updateMerits(msg.author.username, commandString[1], commandString[0], commandString[2], (res) => {
                    msg.reply(res);
                });
            }
            else {
                msg.reply('Invalid Command');
            }
        }
    }
});

client.login(process.env.DISCORD_KEY);