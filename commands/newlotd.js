const { SlashCommandBuilder } = require('discord.js');
const { newLOTDWithMessage } = require('../api/lyric.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('newlotd')
		.setDescription('Generates a brand new lyric of the day'),
	async execute(interaction) {
        if (!interaction.member.roles.cache.some(role => role.name === 'Mods' || role.name === 'Lil Mods') || interaction.member.id == "762447609578651668") {
            await interaction.reply({content: "You do not have permission to use that command!", ephemeral: true});
        }
        else {
            const message = await newLOTDWithMessage();
            await interaction.reply(message);
        }
	},
};