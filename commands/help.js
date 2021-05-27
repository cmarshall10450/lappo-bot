const { commandPrefix } = require('../botConfig')

const help = ({ commandManager, message, args }) => {
	const { command } = commandManager.getCommandFromMessage(args)
	const commandPath = command.getCommandPath()
	const commandString = commandPrefix + commandPath.join(' ')

	const requiredPermissions = command.getRequiredPermissions().join(', ')
	const requiredRoles = command.getRequiredRoles().join(', ')

	const argsString = command
		.getArgs()
		.map((arg) => `<${arg}>`)
		.join(' ')

	const usageMessage = `${commandPrefix}${command.getName()} ${argsString}`

	const helpMessage = `
  Name: ${command.getName()}
  Description: ${command.getDescription()}
  Usage: ${usageMessage}
  Required roles: ${requiredRoles}
  Required permissions: ${requiredPermissions}`

	message.reply(`I've sent you a DM with help for the ${commandString} command`)
	message.member.send(`Help for ${commandString}\n${helpMessage}`)
}

module.exports = help
