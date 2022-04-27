import numbers, random

# Parses message and deals with the dice.
def parse_message(message):

	if message.split(" ")[0] != "/r" and message.split(" ")[0] != "/roll":
		return
	
	message_dice = message.split(" ")[1]
	buffer = ""
	roll_results = list()

	for char in message_dice:
		if char=="+" or char=="-":
			roll_results.extend(execute_command(buffer))
			buffer = ""
		
		buffer = buffer + char
	roll_results.extend(execute_command(buffer))
	
	return format_results(roll_results)
	
	
# Rolls the dice and saves the numbers.
def execute_command(roll_command):
	
	sign = 1

	if roll_command[0] == "+":
		roll_command = roll_command[1:]
	elif roll_command[0] == "-":
		sign = -1
		roll_command = roll_command[1:]

	# Just adding a number (no roll).
	if not ("d" in roll_command):
		return [sign*int(roll_command)]
	
	dice_count = int(roll_command.split("d")[0])
	side_count = int(roll_command.split("d")[1])

	rolls = list()

	for i in range(dice_count):
		rolls.append(int(sign * random.randint(1, side_count)))

	return rolls

# Formats the rolls as (1+2+3) = 6
def format_results(rolls):
	if len(rolls) <= 1:
		return rolls[0]

	sum = int(rolls[0])
	message = "("+str(rolls[0])

	for num in rolls[1:]:
		sum += int(num)
		
		if num >= 0:
			message = message + "+"
		message = message + str(num)
	
	message = message + ") = " + str(sum)

	return message