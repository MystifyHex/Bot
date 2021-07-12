const { MessageEmbed } = require("discord.js");
const Schema = require("../models/Guild/schema");

module.exports = (client, member) => {
    Schema.findOne({ guildID: member.guild.id }, async (e, data) => {
      const Embed = new MessageEmbed()
        .setAuthor("User Banned", member.user.AvatarURL())
        .setDescription(
          `${member.user} ${member.user.username}#${member.user.discriminator}`
        )
        .setFooter(`ID: ${member.user.id}`)
        .setImage(member.user.AvatarURL())
        .setTimestamp();

      const channel = client.channels.cache.get(data.logChannelID)
      channel.send(Embed);
    });
}