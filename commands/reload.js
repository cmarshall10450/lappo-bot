const { commandConfigFile } = require('../botConfig')

const reload = ({ commandManager, message }) => {
  commandManager.reload()
  message.channel.send('Reloaded Lappo Bot commands')
}

module.exports = reload
