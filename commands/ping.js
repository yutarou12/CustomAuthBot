module.exports = {
    data: {
        name: 'ping',
        description: 'BOTの応答速度を計測します。'
    },
    async execute(interaction) {
        await interaction.reply({ content: 'Pinging...', ephemeral: true});
        const timeDiff = (new Date()).getTime() - interaction.createdAt.getTime();
        await interaction.editReply({ content: `Pong! 🏓Took: ${Math.floor(timeDiff)} ms` });
    }
}