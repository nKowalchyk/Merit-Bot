require('dotenv').config({path: __dirname + '\\ENVIRONMENT.env'});
const command = require('./commands/command.js');
const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require('node-fetch');

client.on('ready', () => {
    console.log('Merit-Bot has arrived!');
    let dirty = false;
    for(user of client.users) {
        if(!user.bot && !dirty) {
            console.log(user[1].tag);
            //command.addUser(user[1].tag);
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
        commandString[1] = msg.mentions.users.first().username;
        commandString[0] = commandString[0].substring(1);
        console.log(commandString);

        if(commandString[0] === 'merits' || commandString[0] === 'demerits') {
            if(commandString.length === 2) {
                command.getMerits(commandString[1], (res) => {
                    msg.reply(res); 
                });
            }
            else if(commandString.length === 3) {
                command.updateMerits(msg.author.username, commandString[1], commandString[0], commandString[2], (res) => {
                    console.log(res);
                });
            }
            else {
                msg.reply('Invalid Command');
            }
        }
        
        //let user = msg.mentions.users.first();
        //console.log(commandString);

        //let tokens = command.parse(commandString);

      /*  if(!user) {
            msg.reply('User not in the server');
            return;
        }*/
        //commandString[0] = user.tag;
        //console.log(tokens);
        //let response = 'not valid';
      /*  command.getMerits(tokens.username, function(res) {
            response = res;
            console.log(response);
            msg.reply(response);
        }); */
        //console.log('client');
        //console.log(response);
        //msg.reply(response);
       /* if(tokens != null) {
            if(Object.keys(tokens).length === command.printCommandLength) {
                console.log('getting merits');
                command.getMerits(tokens.username);
            }   
            else if(Object.keys(tokens).length === command.commandLength) {
                command.updateMerits(tokens.username, tokens.target, result.meritOrDemerit, result.amt);
            }
        }
        else {
            msg.reply('Not a valid command'); */
        //} 
        //console.log(response);
    }
});

client.login(process.env.DISCORD_KEY);