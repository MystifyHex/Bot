const { MessageEmbed } = require('discord.js');
module.exports.run = async (client, message, args, utils, data) => {
    const schema = require('../../models/Guild/schema')
    if (args[0] === 'on') {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You need administrator permissions to use this command')
        const cmd = args[1];
        if (!cmd) return message.channel.send('Please specify a command')
        if (!!client.commands.get(cmd) === false || !!client.aliases.get(cmd) === false) return message.channel.send('This command does not exist');
        schema.findOne({ guildID: message.guild.id }, async (err, data) => {
            if (err) throw err;
            if (data) {
                if (data.Cmds.includes(cmd)) {

                    if (data.Cmds[data.Cmds.indexOf(cmd)] === cmd) data.Cmds.splice(data.Cmds.indexOf(cmd), 1)

                    await data.save()
                    message.channel.send(`\`${cmd}\` has been setted to **on**.`)
                } else return message.channel.send('That command isnt turned off.')
            }
        })
    } else if (args[0] === 'off') {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You need administrator permissions to use this command')
        const cmd = args[1];
        if (!cmd) return message.channel.send('Please specify a command')
        if (!!client.commands.get(cmd) === false || !!client.aliases.get(cmd) === false) return message.channel.send('This command does not exist...');
        schema.findOne({ guildID: message.guild.id }, async (err, data) => {
            if (err) throw err;
            if (data.Cmds.includes(cmd)) return message.channel.send('This command has already been disabled.');
            data.Cmds.push(cmd)
            data.save();
            message.channel.send(`\`${cmd}\` has been setted to **off**.`)
        })
    } else {
        return message.channel.send('Incorrect format\nExample: `>setcommand (on || off) {command}`');
    }
};

module.exports.help = {
    aliases: [],
    name: 'setcommand',
    description: 'Enable/disable a command',
    usage: '>setcommand (on || off) %command%',
};

module.exports.config = {
    args: true,
    restricted: false,
    category: 'Config',
    disable: false,
    userPerms: ['ADMINISTRATOR'],
    cooldown: 10000,
};
