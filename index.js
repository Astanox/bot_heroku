const Discord = require('discord.js');
const Client = new Discord.Client();
const config = require('./config.js');
const fs = require('fs');
const dotenv = require('dotenv')
dotenv.config()

Client.db = require('./db.json')

Client.on('message', (message) => {

    let args = message.content.split(" ");
    let command = args.shift().toLowerCase();

    if(!command.startsWith('>>')) return;

    switch(command) {
        case config.prefix + 'warn':
            require('./warn.js').execute(Client, message, args);
        break;

        case config.prefix + 'infractions':
            require('./infractions.js').execute(Client, message, args);
            break;

        case config.prefix + 'unwarn':
            require('./unwarn.js').execute(Client, message, args);
            break;

        default: break;
    }
});

Client.on('guildMemberAdd', (member) => {
    //lorsqu'un utilisateur rejoint.
client.channels.cache.get('851198220494831626').send(`➜ ${member} vient de rejoindre le serveur souhaitez lui la Bienvenue, Nous somme désormais ${member.guild.memberCount} 🎉 \n・Pense a prendre tes <#851198220494831626> !`)
});






Client.login(process.env.token)