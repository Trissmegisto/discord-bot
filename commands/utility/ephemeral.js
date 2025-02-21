const { SlashCommandBuilder, MessageFlags } = require('discord.js');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('ephemeral')
		.setDescription('Replies an ephemeral message'),
	async execute(interaction) {
		await interaction.reply({ content: 'This is an ephemeral message!', flags: MessageFlags.Ephemeral });
	},
};
