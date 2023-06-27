const { SlashCommandBuilder } = require('discord.js');
const { getLOTD } = require('../api/lyric.js');
const { getTrack } = require('../api/tracks.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('guess')
		.setDescription('Guess which song the lyric of the day is from')
        .addStringOption(option =>
            option.setName('song')
            .setDescription('The name of the song you want to guess')
            .setRequired(true)),
	async execute(interaction) {
		const { trackid } = await getLOTD();
        const correctTrack = getTrack(trackid);
        const guess = interaction.options.getString("song");
        const res = guess.toLowerCase() === correctTrack.name.toLowerCase();
        await interaction.reply(res ? "correct": "incorrect");
        if (res) await interaction.channel.send(`<@${interaction.user.id}> guessed correctly!`)
        else await interaction.channel.send(`<@${interaction.user.id}> guessed incorrectly :(`)

	},  
};