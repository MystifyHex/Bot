const { MessageEmbed } = require("discord.js");
const Schema = require("../models/Guild/schema");

module.exports = async (client, r) => {
    Schema.findOne({ guildID: r.message.channel.guild.id }, async (e, data) => {
        if (!data) return;
        let positiveReaction = r.message.reactions.cache.get('⬆️')
        let negativeReaction = r.message.reactions.cache.get('⬇️')
        let negativeCount = negativeReaction ? negativeReaction.count : 0
        let positiveCount = positiveReaction ? positiveReaction.count : 0

        let emb = new MessageEmbed()
        .setAuthor(r.message.embeds[0].author.name, r.message.embeds[0].author.iconURL)
        .setDescription(r.message.embeds[0].description.split('\n')[0] + '\n' +r.message.embeds[0].description.split('\n')[1] + '\n:white_check_mark: '+(positiveCount / (positiveCount + negativeCount) * 100).toFixed(2)+'% | :x: '+(negativeCount / (positiveCount + negativeCount) * 100).toFixed(2)+'%')
        .setColor('RANDOM')
        r.message.edit({embed: emb })
    });
};