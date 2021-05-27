const _ = require('lodash')

class Command {
	constructor(name, description = '') {
		this.action = () => {}
		this.args = []
		this.description = description
		this.helpMessage = ''
		this.name = name
		this.parentCommand = null
		this.requiredPermissions = []
		this.requiredRoles = []
		this.subCommands = {}
		this.usage = ''
	}

	static fromJson(json) {
		const {
			args,
			commandAction,
			description,
			helpMessage,
			name,
			requiredPermissions,
			requiredRoles,
			subCommands,
			usage,
		} = json
		const command = new Command(name, description)

		if (subCommands) {
			command.addSubCommands(
				subCommands.map((cmd) =>
					Command.fromJson(cmd).setParentCommand(command)
				)
			)
		}

		command.setHelpMessage(helpMessage || '')
		command.setUsage(usage || '')

		if (commandAction) {
			command.setAction(require(`./commands/${commandAction}`))
		}

		if (args) {
			command.setArgs(args)
		}

		if (requiredPermissions) {
			command.setRequiredPermissions(requiredPermissions)
		}

		if (requiredRoles) {
			command.setRequiredRoles(requiredRoles)
		}

		return command
	}

	addSubCommand(command) {
		this.subCommands = { ...this.subCommands, [command.name]: command }
	}

	addSubCommands(commands) {
		commands.forEach((command) => this.addSubCommand(command))
	}

	displaySubCommands() {
		const subCommandNames = this.subCommands.map((command) => command.name)
		return subCommandNames.join(', ')
	}

	getName() {
		return this.name
	}

	getDescription() {
		return this.description
	}

	getParentCommand() {
		return this.parentCommand
	}

	getSubCommand(name) {
		return this.subCommands[name]
	}

	getSubCommands() {
		return this.subCommands
	}

	getHelpMessage() {
		return this.helpMessage
	}

	getUsage() {
		return this.usage
	}

	getRequiredPermissions() {
		return this.requiredPermissions
	}

	getRequiredRoles() {
		return this.requiredRoles
	}

	getArgs() {
		return this.args
	}

	getCommandPath() {
		const path = [this.getName()]
		let command = this
		while (command && command.getParentCommand()) {
			path.unshift(command.getParentCommand().getName())
			command = command.getParentCommand()
		}

		return path
	}

	setName(name) {
		this.name = name
		return this
	}

	setDescription(description) {
		this.description = description
		return this
	}

	setParentCommand(command) {
		this.parentCommand = command
		return this
	}

	setHelpMessage(helpMessage) {
		this.helpMessage = helpMessage
		return this
	}

	setUsage(usage) {
		this.usage = usage
		return this
	}

	setArgs(args) {
		this.args = args
		return this
	}

	setRequiredPermissions(permissions) {
		this.requiredPermissions = permissions
		return this
	}

	setRequiredRoles(roles) {
		this.requiredRoles = roles
		return this
	}

	setAction(action) {
		this.action = action
		return this
	}

	executeAction(action) {
		const hasArgs = this.args.length > 0
		const args = hasArgs
			? Object.fromEntries(_.zip(this.args, action.args))
			: action.args

		let params = { ...action, args, command: this }
		return this.action(params)
	}
}

module.exports = Command
