exports.run = async (client, commands) => {
    console.log(commands)
    const data = []
    for (const commandName in commands) {
        data.push(commands[commandName].data)

    }
    if (client.isReady()){
        await client.application?.commands.set(data, '651778808508317707');
        await client.user?.setActivity({name: `Prefix: / | ${client.guilds.cache.size}guilds`})
    }
    console.log(`${client.user?.tag} でログインしました。`);
};