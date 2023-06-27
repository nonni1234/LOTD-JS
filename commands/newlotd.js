const { SlashCommandBuilder } = require('discord.js');
const { getLOTD, newLOTDWithMessage } = require('../api/lyric.js');
const { getTrack } = require('../api/tracks.js');



module.exports = {
	data: new SlashCommandBuilder()
		.setName('newlotd')
		.setDescription('Generates a brand new lyric of the day'),
	async execute(interaction) {
        if (!interaction.member.roles.cache.some(role => role.name === 'Mods' || role.name === 'Lil Mods')) {
            await interaction.reply({content: "You do not have permission to use that command!", ephemeral: true});
        }
        else {
            const message = await newLOTDWithMessage();
            await interaction.reply(message);
        }
	},
};