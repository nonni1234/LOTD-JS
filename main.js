const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { initTracks } = require('./api/tracks.js');
const { generateLyric, newLOTDWithMessage, getLOTD } = require('./api/lyric.js');
const cron = require('node-cron');

require('dotenv').config();

const fs = require('node:fs');
const path = require('node:path');
const { log } = require('node:console');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection()

const commandsPath = path.join(__dirname,'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

commandFiles.forEach(file => {
    const filePath = path.join(commandsPath,file);
    const command = require(filePath);

    // Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}

})
// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
	console.log("Setting schedule LOTD post to midnight New York (EST) Time ")

	const cronTask = async () => {
		console.log("Running scheduled task");
		const message = await newLOTDWithMessage();
		// console.log("Message: " + message);
		const channel = await c.channels.fetch(process.env.lotdchannelid);
		// console.log(channel);
		channel.send(message);

		// Makes task only run once
	}

	cronTask(); // Run task once

	const task = cron.schedule('0 0 * * *', cronTask, {
		timezone: 'America/New_York'
	} )
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});



// Log in to Discord with your client's token
initTracks().then(()=> {
	client.login(process.env.token);
	getLOTD();
})