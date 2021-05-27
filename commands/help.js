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

	const usageMessage = `${commandString} ${argsString}`

	const lines = [
		`Name: ${commandString}`,
		`Description: ${command.getDescription()}`,
		`Usage: ${usageMessage}`,
	]

	if (command.getExampleArgs()) {
		lines.push(
			`Example: ${commandString} ${command.getExampleArgs().join(' ')}`
		)
	}
	if (requiredRoles) {
		lines.push(`Required roles: ${requiredRoles}`)
	}
	if (requiredPermissions) {
		lines.push(`Required permissions: ${requiredPermissions}`)
	}

	const helpMessage = lines.join('\n')

	message.reply(`I've sent you a DM with help for the ${commandString} command`)
	message.member.send(`Help for ${commandString}\n${helpMessage}`)
}

module.exports = help
