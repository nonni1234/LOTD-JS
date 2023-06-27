const { SlashCommandBuilder } = require('discord.js');
const { getLOTD, newLOTD} = require('../api/lyric.js');
const { getTrack } = require('../api/tracks.js');



module.exports = {
	data: new SlashCommandBuilder()
		.setName('newlotd')
		.setDescription('Generates a brand new lyric of the day'),
	async execute(interaction) {
        if (!interaction.member.roles.cache.some(role => role.name === 'Mods' || role.name === 'Lil Mods')) {
            await interaction.reply("You do not have permission to use that command!");
        }
        else {
            const { trackid } = await getLOTD(); 
            const lyric = await newLOTD();
            const prevtrack = getTrack(trackid);
            console.log("TID:" + trackid);
            await interaction.reply(`The answer to the **last** LOTD was: ||${prevtrack.name}||\n**The Lyric Of The Day**\n\n♪ ${lyric} ♪`)
        }
	},
};