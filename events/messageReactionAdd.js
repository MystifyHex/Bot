const { MessageEmbed } = require("discord.js");
const Schema = require("../models/Guild/schema");

module.exports = async (client, r) => {
    let src = r.message.embeds[0].description.split('\n')[2]
    console.log(src)
    console.log(src.indexOf(':white_check_mark:'))
    console.log(src.slice(src.indexOf(':white_check_mark:')))
    if (r.message.partial) await r.message.fetch();
    Schema.findOne({ guildID: r.message.channel.guild.id }, async (e, data) => {
        if (!data) return;
        r.message.edit(new MessageEmbed()
            .setAuthor(r.message.embeds[0].author.name, r.message.embeds[0].author.iconURL)
            .setDescription(r.message.embeds[0].description)
            .setColor('RANDOM')
        )
    });
};
