const { SlashCommandBuilder } = require('discord.js');
const { getTracks } = require("../api/index");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        const tracks = getTracks();
        await interaction.reply(`Pong! ${tracks[0].name}`)
    }

};