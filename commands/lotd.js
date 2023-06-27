const { SlashCommandBuilder } = require('discord.js');
const { getLOTD } = require('../api/lyric.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('lotd')
		.setDescription('Shows the current lyric of the day'),
	async execute(interaction) {
		const { lyric } = await getLOTD();
		if (lyric === undefined) await interaction.reply('There is currently no lyric of the day')
		else await interaction.reply(`The current LOTD is:\n` + `♪ ${lyric} ♪`)
	},
};