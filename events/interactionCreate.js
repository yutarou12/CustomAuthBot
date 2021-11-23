const {MessageEmbed} = require("discord.js");
exports.run = async (client, commands, interaction) => {
    if (interaction?.isCommand()) {
        const command = commands[interaction?.commandName];
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction?.reply({
                content: '予期しないエラーが発生しました。',
                ephemeral: true
            })
        }
    } else if (interaction?.isButton()) {
        const guild = interaction?.guild;
        const q_and_a = {
            '651778808508317707': {
                'question': 'ホームページに記載されている秘密の言葉は？',
                'answer': '12345'
            }
        }

        if (interaction.customId === 'auth_button'){
            const embed = new MessageEmbed({title: 'カスタム認証', description: '以下の質問の答えを送信してください。\n```'+q_and_a[guild.id]['question']+'\n```'})

            await interaction.user.send({embeds: [embed]})
            await interaction.reply({ content: 'DMを確認してください。', ephemeral: true })
            try {
                const filter = dm_msg => dm_msg.author.id === interaction.user.id
                const reply_msg = await interaction.user.dmChannel?.awaitMessages( {filter, max: 1 , time: 10000, errors:['time']})
                if (reply_msg){
                    const res_content = reply_msg.first().content
                    if (res_content === q_and_a[guild.id]['answer']){
                        await interaction.user.send({embeds: [new MessageEmbed({title: '認証成功', description: '認証に成功しました。'})]})
                        await interaction.editReply({content: '認証に成功しました。', ephemeral: true})
                    } else {
                        await interaction.user.send({embeds: [new MessageEmbed({title: '認証失敗', description: '認証に失敗しました。'})]})
                        await interaction.editReply({content: '認証に失敗しました。', ephemeral: true})
                    }
                }
            } catch (error) {
                await interaction.editReply({content: '再度認証して下さい。', ephemeral: true})
            }
        }
    }
}