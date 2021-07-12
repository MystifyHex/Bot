/* eslint-disable no-unused-vars */
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
  const got = require('got')
  const embed = new Discord.MessageEmbed()
  got('https://www.reddit.com/r/memes/random/.json').then(response => {
    let content = JSON.parse(response.body);
    let permalink = content[0].data.children[0].data.permalink;
    let memeUrl = `https://reddit.com${permalink}`;
    let memeImage = content[0].data.children[0].data.url;
    let memeTitle = content[0].data.children[0].data.title;
    let memeUpvotes = content[0].data.children[0].data.ups;
    let memeDownvotes = content[0].data.children[0].data.downs;
    let memeNumComments = content[0].data.children[0].data.num_comments;
    embed.setTitle(`${memeTitle}`)
    embed.setURL(`${memeUrl}`)
    embed.setImage(memeImage)
    embed.setColor('RANDOM')
    embed.setFooter(`👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`)
    message.channel.send(embed);
  })
};

module.exports.help = {
  aliases: [],
  name: 'meme',
  description: 'Sending reddit memes.',
  usage: '>meme',
};

module.exports.config = {
  args: false,
  restricted: false,
  category: 'fun',
  disable: false,
  cooldown: 1000,
};
