class Command {
	constructor(name, description = '') {
		this.name = name
		this.description = description
		this.subCommands = {}
		this.helpMessage = ''
		this.usage = ''
		this.action = () => {}
	}

	static fromJson(json) {
		const {
			name,
			description,
			subCommands,
			helpMessage,
			usage,
			commandAction,
		} = json
		const command = new Command(name, description)

		if (subCommands) {
			command.addSubCommands(subCommands.map((cmd) => Command.fromJson(cmd)))
		}

		command.setHelpMessage(helpMessage || '')
		command.setUsage(usage || '')

		if (commandAction) {
			command.setAction(require(`./commands/${commandAction}`))
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

	setName(name) {
		this.name = name
		return this
	}

	setDescription(description) {
		this.description = description
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

	setAction(action) {
		this.action = action
		return this
	}

	executeAction(bot, msg, ...args) {
		return this.action(bot, msg, args)
	}
}

module.exports = Command
