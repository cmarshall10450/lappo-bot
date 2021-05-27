const help = ({ commandManager, message, args }) => {
	message.reply(`I've sent you a DM with help for the ${command.name} command`)

	message.author.send(`Help for ${commandPath}`)
}

module.exports = help
