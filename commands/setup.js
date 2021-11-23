const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
    data: {
        name: 'setup',
        description: '認証用のパネルを設置します。'
    },
    async execute(interaction) {
        const guild = interaction.guild;
        const member = interaction.member;

        if(guild.ownerId !== member.id) {
            interaction.reply('このコマンドはサーバーオーナーしか使えません。');
            return;
        }

        const embed = new MessageEmbed({
            title: '認証パネル',
            description: '認証を行うには下のボタンを押してください。'
        })

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('auth_button')
                    .setLabel('認証')
                    .setStyle('PRIMARY')
            );

        await interaction.reply({ embeds: [embed], components: [row] });
    }
}