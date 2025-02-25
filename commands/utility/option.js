const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dizer')
		.setDescription('Repete o que você digitar')
		.addStringOption(option =>
			option.setName('mensagem')
				.setDescription('A mensagem que você quer que eu repita')
				.setRequired(true),
		),
	async execute(interaction) {
		const mensagem = interaction.options.getString('mensagem');
		await interaction.reply(`Você disse: ${mensagem}`);
	},
};