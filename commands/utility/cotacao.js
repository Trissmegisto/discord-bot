const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cotacao')
		.setDescription('Mostra a cotação do dólar, bitcoin e solana'),

	async execute(interaction) {
		try {
			const dolarResponse = await axios.get('https://economia.awesomeapi.com.br/json/last/USD-BRL');
			const dolar = dolarResponse.data.USDBRL.bid;

			const cryptoResponse = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,solana&vs_currencies=brl');
			const bitcoin = cryptoResponse.data.bitcoin.brl;
			const solana = cryptoResponse.data.solana.brl;

			const valorDolar = dolar.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
			const valorBitcoin = bitcoin.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
			const valorSolana = solana.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

			const cotacaoEmbed = new EmbedBuilder()
			    .setColor(0xF2F61D)
				.setTitle('Cotação 🪙')
				.setAuthor({ name: 'João Gilberto', iconURL: 'https://i.pinimg.com/736x/09/e6/f4/09e6f489a8c904fd6c9a01a9e8dfb12d.jpg', url: 'https://github.com/Trissmegisto/discord-bot' })
				.setDescription('Cotação do dólar, bitcoin e solana')
				.setThumbnail('https://i.pinimg.com/736x/09/e6/f4/09e6f489a8c904fd6c9a01a9e8dfb12d.jpg')
				.addFields(
					{ name: 'K.M', value: '"O dinheiro é a essência alienada do trabalho e da existência do homem; essa essência o domina e ele a adora." – Karl Marx' },
					{ name: '\u200B', value: '\u200B' },
					{ name: 'Dólar', value: `R$ ${valorDolar}` },
					{ name: 'Bitcoin', value: `R$ ${valorBitcoin}` },
				)
				.addFields({ name: 'Solana', value: `R$ ${valorSolana}` })
				.setImage('https://i.pinimg.com/736x/09/e6/f4/09e6f489a8c904fd6c9a01a9e8dfb12d.jpg')
				.setTimestamp()
				.setFooter({ text: 'Atualizações em breve', iconURL: 'https://i.pinimg.com/736x/09/e6/f4/09e6f489a8c904fd6c9a01a9e8dfb12d.jpg' });

			await interaction.reply({ embeds: [cotacaoEmbed] });

		}
		catch (error) {
			console.error('Erro ao buscar cotações:', error);
			await interaction.followUp('Ocorreu um erro ao buscar a cotação');
		}
	},
};