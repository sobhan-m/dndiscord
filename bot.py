from warnings import simplefilter
import discord, random

client = discord.Client()

# Called when this successfully connects to Discord.
@client.event
async def on_ready():
	print(f"Debug: {client.user} is ready.")

@client.event
async def on_message(message):
	print("Debug: Received message.")

	# Avoiding the bot responding to itself.
	if message.author == client.user:
		return

	message_command = message.content.split(" ")[0]
	message_content= message.content.split(" ")[1]

	
	await message.channel.send("Hello World")



# Runs the client.
#client.run(#Needs Token)