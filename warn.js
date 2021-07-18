const { DiscordAPIError } = require('discord.js');
const fs = require('fs');
const Discord = require('discord.js')
const config = require('./config.js')

module.exports = {
    execute: (Client, message, args) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande !')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez mentionner le membre à warn !')
        if (member.id === message.guild.ownerID) return message.channel.send('Vous ne pouvez pas warn le propriétaire du serveur !')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id  !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas warn cette personne !')
        const reason = args.slice(1).join(' ')
        if (!reason) return message.channel.send('Veuillez indiquer une raison !')
        if (!Client.db.warns[member.id]) Client.db.warns[member.id] = []
        Client.db.warns[member.id].unshift({
            reason,
            date: Date.now(),
            mod: message.author.id
        })
        fs.writeFileSync('./db.json', JSON.stringify(Client.db))
        message.channel.send(`${member} a été warn pour ${reason} !`)
        message.guild.channels.cache.get('863514115728474122').send(new Discord.MessageEmbed()//id salon :863514115728474122
        .setAuthor(`[WARN] ${member.user.tag}`, member.user.displayAvatarURL())
        .addField('Utilisateur', member, true)
        .addField('Modérateur', message.author, true)
        .addField('Raison', reason, true))

    }
}