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
            .setRequired(true)
            ),
	async execute(interaction) {
		const { trackid } = await getLOTD();
        if (trackid === undefined) {
            await interaction.reply("There is currently no lyric of the day");
            return
        }
        const correctTrack = getTrack(trackid);

        const guess = interaction.options.getString("song");
        const res = guess.toLowerCase() === correctTrack.name.toLowerCase();

        if (res) {

            await  interaction.reply({content: `Correct!`, ephemeral: true})
            await interaction.channel.send(`<@${interaction.user.id}> has guessed todays lyric`)
        }
        else await interaction.reply({content: `Incorrect, try again!`, ephemeral: true})
	},  
};