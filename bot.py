from warnings import simplefilter
import discord, functions, os
from dotenv import load_dotenv
load_dotenv()

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
	


token = os.environ.get("BOT_TOKEN")

# Runs the client.
client.run(token)