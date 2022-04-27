from warnings import simplefilter
import discord, functions

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

	result = functions.parse_message(message.content)

	if (result != None):
		await message.channel.send(f"@{message.author} rolled: {result}")
	else:
		print("Debug: Empty Result")
	


f = open("credentials.txt", "r")
token = f.readline()
f.close()


# Runs the client.
client.run(token)