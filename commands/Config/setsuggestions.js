const { MessageEmbed } = require('discord.js');
module.exports.run = async (client, message, args, utils, data) => {
    const schema = require('../../models/Guild/schema')

    const channel = message.mentions.channels.first()

    if (!channel) return message.channel.send('Incorrect format\nExample: `>setsuggestions (on || off) {channel}`');
    schema.findOne({ guildID: message.guild.id }, async (err, data) => {
        if (args[0] === 'on') {
            if (data) {
                data.suggestions = true
                data.suggestionsChannel = channel.id
                await data.save()
                message.channel.send(`\`Suggestions\` has been setted to **on** in ${channel}.`)
            }
        } else if (args[0] === 'off') {
            if (data) {
                data.suggestions = false
                data.suggestionsChannel = null
                await data.save()
                message.channel.send(`\`Suggestions\` has been setted to **off**.`)
            }
         } else {
            return message.channel.send('Incorrect format\nExample: `>setsuggestions (on || off) {channel}`');
        }
    })
};

module.exports.help = {
    aliases: [],
    name: 'setsuggestions',
    description: 'Enable/disable suggestions',
    usage: '>setsuggestions (on || off) %channel%',
};

module.exports.config = {
    args: true,
    restricted: false,
    category: 'Config',
    disable: false,
    userPerms: ['ADMINISTRATOR'],
    cooldown: 10000,
};