const fs = require('fs');
const Discord = require('discord.js')
const config = require('./config.js')

module.exports = {
    execute: (Client, message, args) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande !')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez mentionner le membre à unwarn !')
        if (!Client.db.warns[member.id]) return message.channel.send('Ce membre n\'a aucun warn !')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id  !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas unwarn cette personne !')
        const warnIndex = parseInt(args[1], 10) - 1
        if (warnIndex < 0 || !Client.db.warns[member.id][warnIndex]) return message.channel.send('Ce warn n\'existe pas !')
        const {reason} = Client.db.warns[member.id].splice(warnIndex, 1)[0]
        if (!Client.db.warns[member.id].lenght) delete Client.db.warns[member.id]
        fs.writeFileSync('./db.json', JSON.stringify(Client.db))
        message.channel.send(`${member} a été unwarn pour ${reason} !`)
        message.guild.channels.cache.get('863514115728474122').send(new Discord.MessageEmbed()//id salon :863514115728474122
        .setAuthor(`[UNWARN] ${member.user.tag}`, member.user.displayAvatarURL())
        .addField('Utilisateur', member, true)
        .addField('Modérateur', message.author, true))
    }
}