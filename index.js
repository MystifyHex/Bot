
const Nova = require('./data/Nova')
const client = new Nova({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

client.start(process.env.TOKEN, process.env.MONGO_URL);
