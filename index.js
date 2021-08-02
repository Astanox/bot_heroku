const Discord = require('discord.js');
const Client = new Discord.Client();
const config = require('./config.js');
const fs = require('fs');
const dotenv = require('dotenv')
dotenv.config()

Client.db = require('./db.json')

Client.on('guildMemberAdd', (member) => {
    // Lorsqu'un utilisateur rejoin.
    let welcomeChannel = client.channels.cache.get('866762820396908557');
    welcomeChannel.send(`${member} vient de rejoindre le serveur souhaitez lui la Bienvenue, Nous somme désormais ${member.guild.memberCount} 🎉 \n\n Pense a prendre tes <#851198220494831626> !`);

    member.roles.add('841982248840724480');
});


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

Client.login(process.env.token)