exports.run = async (client, commands, interaction) => {
    console.log(interaction)
    if (!interaction?.isCommand()) {
        return;
    }
    const command = commands[interaction?.commandName];
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction?.reply({
            content: 'There was an error while executing this command!',
            ephemeral: true
        })
    }
}