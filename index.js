require('dotenv').config()
const Discord = require('discord.js')
const bot = new Discord.Client()
const { commandPrefix, commandConfigFile } = require('./botConfig')
const CommandManager = require('./CommandManager')

bot.commandManager = CommandManager.fromFile(commandConfigFile)
bot.commandManager.setBot(bot)

const TOKEN = process.env.TOKEN

bot.login(TOKEN)

bot.on('ready', () => {
	console.info(`Logged in as ${bot.user.tag}!`)
})

bot.on('message', (msg) => {
	const command = msg.content.replace(commandPrefix, '')

	console.log(msg.content.startsWith(commandPrefix))
	console.log(bot.commandManager.hasCommand(command))

	if (
		msg.content.startsWith(commandPrefix) &&
		bot.commandManager.hasCommand(command)
	) {
		console.info(`Called command: ${command}`)

		try {
			bot.commandManager.executeCommand(msg)
		} catch (error) {
			console.error(error)
			msg.reply('there was an error trying to execute that command!')
		}
	} else {
		console.log(command)
		console.log('not a command')
		return
	}
})
