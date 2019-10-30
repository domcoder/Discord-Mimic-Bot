const Discord = require('discord.js')
const client = new Discord.Client()

//Rotating event
const statuses = [
  '& creeping around...',
  'while ambushing',
  '& morphing subtly',
  "hide'n'seek",
  'around as a cup'
]

//For my end (home/dom_local/DiscordBot$ nodemon index.js)
client.on('ready', () => {
  console.log(`Morphed into ${client.user.tag}!`);
  //cRotates randomly though statuses
  setInterval(() => {
    const index = Math.floor(Math.random() * (statuses.length - 1) + 1);
    client.user.setStatus('available')
    client.user.setPresence({
      game: {
        name: statuses[index],
        type: "PLAYING",
        url: "https://discordapp.com/api/oauth2/authorize?client_id=638793181701472266&permissions=0&scope=bot"
          }
    });
  }, 60000);

//Changes avatar into mug at a 5% chance every hour
  setInterval(() => {
    const rand = Math.floor((Math.random() * 20) + 1);
      if (rand === 10) {
        client.user.setAvatar("./MimicMug.jpg")
          .catch(console.error);
      } else {
        client.user.setAvatar("./MimicDark.jpg")
          .catch(console.error);
      }
  }, 3600*1000); //3600*1000 = every hour

})

//Ping -> Pong!
client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.channel.send('Pong!')
      .catch(console.error);
  }
})

//New member welcome
client.on('guildMemberAdd', member => {
  member.send(`A new user joins us in the depths of discord. Welcome, ${member}.`)
    .catch(console.error);
})

//Kick members
client.on('message', msg => {
  if (msg.content.startsWith('airlock')) {
    const member = msg.mentions.members.first()
      .catch(console.error);

    if (!member) {
      return msg.reply('You must mention the user to airlock.')
        .catch(console.error);
    }

    if (!member.kickable) {
      return msg.reply(`This user can not be airlocked.`)
      .catch(console.error);
    }

    return member
      .kick()
      .then(() => msg.send(`${member.user.tag} was thrown out the airlock.`))
      .catch(error => msg.send(`The airlock malfunctioned.`))
  }
})

client.on('message', msg => {
  if (msg.content === 'stopall') {
    msg.reply('Command still being worked on.')
      .catch(console.error);
  }
})

//Mimic, monkey see monkey do
var input = "___";

client.on('message', msg => {
  if (!msg.author.bot) {
    if (msg.content.includes('mimic')) {
      input = msg.content;
      //input = input.replace('mimic','');
      msg.channel.send(input);
    }
  }
})

//Morph into user
client.on('message', msg => {
  if (msg.content.startsWith('morph')) {
    msg.member.setNickname('Mimic')
      .catch(console.error);
//attempted to change bot's nickname but permissions get in way
    //msg.channel.send(msg.member.Nickname);
    //console.log(msg.author.nickname);
    //msg.author.nickname;
  }
})

//Help menu
client.on('message', msg => {
  if (msg.content.includes('mimichelp')) {
    msg.channel.send('The commands included are:');
    msg.channel.send('- ping - invokes basic response');
    msg.channel.send('- airlock - kicks a member');
    msg.channel.send('- mimic - repeats anything said after the word mimic');
    msg.channel.send("- morph - user joins the pack");
  }
})

//WIP
client.on('message', msg => {
  if (!msg.guild) return;

  if (msg.content === '/join') {
    if (msg.member.voiceChannel) {
      msg.member.voiceChannel.join()
        .then(connection => { // Connection is an instance of VoiceConnection
          connection.playStream('http://23.237.126.42/ost/the-witcher-3-wild-hunt-extended-edition/wanswoqf/01.%20The%20Trail.mp3');
        })
        .catch(console.log);
    } else {
      msg.reply('You need to join a voice channel first!');
    }
  }
});


client.login('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
