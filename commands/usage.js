const { commandPrefix } = require('../botConfig')

const usage = ({ commandManager, message, args }) => {
	const { command } = commandManager.getCommandFromMessage(args)
	const commandPath = command.getCommandPath()
	const commandString = commandPrefix + commandPath.join(' ')
	const argsString = command
		.getArgs()
		.map((arg) => `<${arg}>`)
		.join(' ')

	const usageMessage = `${commandString} ${argsString}`

	message.reply(
		`I've sent you a DM with an example for how to use the ${commandString} command`
	)
	message.member.send(`Usage for ${commandString}\n${usageMessage}`)
}

module.exports = usage
