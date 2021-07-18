const moment = require('moment');
const Discord = require('discord.js');

moment.locale('fr')

module.exports = {
    execute: (Client, message, args) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande !')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez mentionner le membre dont vous voullez voir les warns !')
        if (!Client.db.warns[member.id]) return message.channel.send('Ce membre n\'a aucun warn !')
        message.channel.send(new Discord.MessageEmbed()
        .setDescription(`**Total de warns :** ${Client.db.warns[member.id].length}\n\n__**10 derniers warns**__\n\n${Client.db.warns[member.id].slice(0, 10).map((warn, i) => `${i + 1}. ${warn.reason}\nSanctionné ${moment(warn.date).fromNow()} par <@!${warn.mod}>`).join('\n\n')}`))
    }
}