const { Client, Collection, MessageEmbed } = require('discord.js');


class Nova extends Client {
	constructor(options) {
		super(options);
		const { GiveawayCreator } = require("discord-giveaway");
		const Creator = new GiveawayCreator(this, process.env.MONGO_URL);
		const { Player } = require("discord-player");
		const player = new Player(this);

		// Global variables
		this.commands = new Collection();
		this.cooldowns = new Collection();
		this.aliases = new Collection();
		this.events = new Collection();
		this.giveaways = Creator;
		this.player = player;

	}

	/**
	 * @param {String} token Bot's Token
	 * @param {String} mongoDB Your monogDB URL
	 */
	async start(token, mongoDB) {
		require('./startUp')(this);
		require('./economy')(this);
		require('discord-buttons')(this);


		require('mongoose').connect(mongoDB)
			.then(() => {

				console.log('Connected to MongoDB database!');
			}).catch((err) => {

				console.log('Unable to connect to the Mongodb database. Error:' + err);
			});
	
		this.login(token);
	}
}

module.exports = Nova;