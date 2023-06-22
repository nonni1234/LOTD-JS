const { SlashCommandBuilder } = require('discord.js');
const { newLOTD } = require('../api/lyric.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('lotd')
		.setDescription('Shows the current lyric of the day'),
	async execute(interaction) {
		const lyric = await newLOTD()
		console.log(lyric);
	},
};