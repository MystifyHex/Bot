module.exports.run = async (client, message, args) => {
client.suggest(message, args.slice(0).join(' '))
};

module.exports.help = {
    aliases: [],
    name: 'suggest',
    description: '',
    usage: '>suggest',
};

module.exports.config = {
    args: true,
    restricted: false,
    category: 'Fun',
    disable: false,
    userPerms: [],
    cooldown: 10000,
};