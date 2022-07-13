// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

function parseMessage(message)
{ 
  console.log(`Message In ParseMessage(): ${message}`);
  let messageDice = message.toString().split(" ")[1];
  let buffer = "";
  let rollResults = [];
  
  for (let i = 0; i < messageDice.length; ++i)
  {
      let char = messageDice[i];
      if (char === "+" || char === "-")
      {
        rollResults = rollResults.concat(executeCommand(buffer));
        buffer = "";
      }
      
      buffer = buffer + char;
  }
  
  rollResults = rollResults.concat(executeCommand(buffer));
  
  return formatResults(rollResults);
}

function executeCommand(rollCommand)
{
  let sign = 1;
  
  if (rollCommand[0] === "+")
  {
    rollCommand = rollCommand.substr(1);
  }
  else if (rollCommand[0] === "-")
  {
    sign = -1
    rollCommand = rollCommand.substr(1);
  }
  
  // If it is just a number.
  if (rollCommand.search("d") === -1)
  {
    console.log(`ExecuteCommand() Single: ${[sign * parseInt(rollCommand)]}`);
    
    return [sign * parseInt(rollCommand)];
  }
  
  let diceCount = parseInt(rollCommand.split("d")[0]);
  let sideCount = parseInt(rollCommand.split("d")[1]);
  
  let rolls = [];
  
  for (let i = 0; i < diceCount; ++i)
  {
    rolls.push(Math.floor(Math.random() * sideCount + 1));
  }
  
  console.log(`ExecuteCommand() Rolls: ${rolls}`);
  
  return rolls;
}

function formatResults(rolls)
{
  console.log(`FormatResults() has been entered.`);
  console.log(`FormatResults() parameter type: ${typeof rolls}`);
  
  if (rolls.length <= 1)
  {
    console.log(`Rolls Length: ${rolls.length}`);
    return `\`${rolls[0]}\``;
  }
  
  console.log(`FormatResults() 71`);
  
  let sum = rolls[0];
  let message = `(${rolls[0]}`;
  
  for (let i = 1; i < rolls.length; ++i)
  {
    let num = rolls[i];
    sum += num;
    
    
    if (num >= 0)
    {
      message = message + "+";
    }
    
    message = message + `${num}`;
  }
  
  message = message + `) = \`${sum}\``;
  
  console.log(`FormatMessage() Message: ${message}`);
  
  return message;
}

function rollStats()
{
  let scores = executeCommand("4d6");
  let sum = scores.reduce((a, b) => a + b, 0);
  let min = Math.min(...scores);
  let total = sum - min;
  
  return `Rolls: \`${scores[0]}, ${scores[1]}, ${scores[2]}, ${scores[3]}\`. Total: \`${total}\``;
}

if (context.params.event.content.match(/^\/r .*/i)) {
  let messageContent = context.params.event.content.match(/^\/r .*/i);

  console.log(`Message Sent: ${messageContent}`);

  
  
  await lib.discord.channels['@0.3.0'].messages.create({
    channel_id: context.params.event.channel_id,
    content: `<@${context.params.event.author.id}> rolled: ${parseMessage(messageContent)}`,
    message_reference: {
      message_id: context.params.event.id
    }
  });
}
else if (context.params.event.content.match(/^\/rchar7/i)) {
  
  let message = "";
  for (let i = 0; i < 7; ++i)
  {
    message += `\n${rollStats()}`
  }
  
  await lib.discord.channels['@0.3.0'].messages.create({
    channel_id: context.params.event.channel_id,
    content: `<@${context.params.event.author.id}>'s character ability scores: ${message}`,
    message_reference: {
      message_id: context.params.event.id
    }
  });
}
// Rolls a character if /rchar is used
else if (context.params.event.content.match(/^\/rchar/i)) {
  
  let message = "";
  for (let i = 0; i < 6; ++i)
  {
    message += `\n${rollStats()}`
  }
  
  await lib.discord.channels['@0.3.0'].messages.create({
    channel_id: context.params.event.channel_id,
    content: `<@${context.params.event.author.id}>'s character ability scores: ${message}`,
    message_reference: {
      message_id: context.params.event.id
    }
  });
}
// Help
else if (context.params.event.content.match(/^\/rhelp/i)) {
  
  let message = "";
  message += "`/rhelp`: Brings up a list of commands.\n";
  message += "`/r [rolls]`: Rolls the given dice and finds the total. Such as `/r 2d6+1d4+4`.\n";
  message += "`/rchar`: Rolls 4d6 and drops the smallest to create 6 ability scores.\n";
  message += "`/rchar7`: Rolls 4d6 and drops the smallest to create 7 ability scores.\n";
  
  
  await lib.discord.channels['@0.3.0'].messages.create({
    channel_id: context.params.event.channel_id,
    content: `${message}`,
    message_reference: {
      message_id: context.params.event.id
    }
  });
}

await lib.discord.users['@0.2.1'].me.status.update({
  activity_name: `D&D | /rhelp`,
  activity_type: 'GAME',
  status: 'ONLINE'
});