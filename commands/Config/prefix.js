const guildSchema = require("../../models/Guild/schema")
const Util = require("utils-discord");

module.exports.run = async (client, message, args, utils, data) => {
	const data2 = await Util.mongoFind(guildSchema, {
      guildID: message.guild.id,
    });


	if (!args[0]) return message.reply(`The current prefix is \`${data2.prefix}\`!`);

	if (args[0].length > 3) return message.channel.send('Your new prefix must be under `5` characters!');

	if (args[0] === data2.prefix) return message.channel.send(`The prefix is already \`${data2.prefix}\`!`);

	await require('../../models/Guild/schema').findOne({guildID: message.guild.id}, async (err, data) => {
    data.prefix = args.slice(0).join(" ")
    data.save()
    })
	message.channel.send(`The new prefix is **\`${args.slice(0).join(" ")}\`**`);

};

module.exports.help = {
	aliases: ['prefixset', 'prefix'],
	name: 'setprefix',
	description: 'change the bot\'s prefix',
	usage: '..setprefix %prefix%',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'Config',
	disable: false,
    userPerms: ['MANAGE_GUILD'],
	cooldown: '1d',
};
