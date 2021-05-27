const fs = require('fs')
const { commandPrefix, commandConfigFile } = require('./botConfig')
const Command = require('./Command')

class CommandManager {
  constructor() {
    this.bot = null
    this.commands = {}
  }

  static fromJson(json) {
    const manager = new CommandManager()
    const commands = json.map((cmd) => Command.fromJson(cmd))
    manager.addCommands(commands)
    return manager
  }

  static fromFile(path) {
    const data = fs.readFileSync(path)
    return CommandManager.fromJson(JSON.parse(data))
  }

  addCommand(command) {
    const commandName = command.name.toLowerCase()
    this.commands = { ...this.commands, [commandName]: command }
  }

  addCommands(commands) {
    commands.forEach((command) => this.addCommand(command))
  }

  executeCommand(msg) {
    const commandParts = msg.content.replace(commandPrefix, '').split(/\s+/)
    let command = this.commands[commandParts.shift().toLowerCase()]

    while (Object.keys(command.getSubCommands()).includes(commandParts[0])) {
      command = command.getSubCommand(commandParts.shift().toLowerCase())
    }
    command.executeAction({
      commandManager: this,
      bot: this.bot,
      message: msg,
      args: commandParts,
    })
  }

  getCommands() {
    return this.commands
  }

  hasCommand(fullCommand) {
    const rootCommand = fullCommand.toLowerCase().replace().split(/\s+/)[0]
    return Object.keys(this.commands).includes(rootCommand)
  }

  setBot(bot) {
    this.bot = bot
    return this
  }

  reload() {
    const commands = CommandManager.fromFile(commandConfigFile).getCommands()
    this.commands = commands
  }
}

module.exports = CommandManager
