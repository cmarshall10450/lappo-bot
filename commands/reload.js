const reload = ({ commandManager, message }) => {
  const previousCommands = Object.keys(commandManager.getCommands())
  commandManager.reload()
  const newCommands = Object.keys(commandManager.getCommands()).filter(
    (x) => !previousCommands.includes(x)
  )
  message.channel.send('Reloaded Lappo Bot commands.')
}

module.exports = reload
