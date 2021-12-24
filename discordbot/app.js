const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES] });
require('dotenv').config()

client.on('ready', () =>{
    console.log(`logged in as ${client.user.tag}!`)
});

client.on('guildMemberAdd', (member) => {
    const channelId = '923905962639777852';
    const welcomeMessage = `hey <@${member.id}>! welcome to my server`;
    member.guild.channels.fetch(channelId).then(channel => {
        channel.send(welcomeMessage)
    });
});

client.on('messageCreate', async (message) => {
    const splitMessage = message.content.split(' ')
    if(splitMessage[0] === '$Groot') {
        const command = splitMessage[1]

        if(!command) {
            return
        }

        if(command.toLowerCase() === 'hello'){
            await message.reply("Hello there!");
        }
    }
    
    if (message.content == '$listCommands') {
        const exampleEmbed = new MessageEmbed()
            .setColor('#ffd046')
            .setTitle('Server Commands')
            .setDescription('Here you can see the list of the commands used on the server: ')
            .addFields(
                { name: "`$like`", value: 'Likes the current message' },
                { name: "`$dislike`", value: 'Dislikes the current message'},
                { name: "`$random`", value: 'Returns a random number'},
            )
        message.channel.send({embeds: [exampleEmbed]})
    }

    if (message.content == '$like') {
        message.react('👍');
    }

    if (message.content == '$dislike') {
        message.react('👎');
    }

    if(message.content == '$random'){
        message.react('✅');
        let randomNumber = getRandomNumber(0, 1000);
        message.reply(`Your random number is ${randomNumber}.`)
    }
    
    //console.log(message.content);
});


client.login(process.env.LOGIN_TOKEN)
