const moment = require('moment')
const botConfig = require('../botConfig')

const { userInactivityThresholdDays } = botConfig

const removeInactiveUsers = ({ bot }) => {
  const thresholdDate = moment().subtract(userInactivityThresholdDays, 'days')
  const usersToRemove = Array.from(bot.users.values())
    .filter((user) => !user.bot)
    .reduce((usersToRemove, user) => {
      const { lastMessage } = user

      if (!lastMessage && moment(user.createdAt).isBefore(thresholdDate)) {
        return [...usersToRemove, user]
      } else if (
        (lastMessage &&
          lastMessage.editedTimestamp &&
          moment(lastMessage.editedTimestamp).isBefore(thresholdDate)) ||
        (lastMessage &&
          lastMessage.createdTimestamp &&
          moment(lastMessage.createdTimestamp).isBefore(thresholdDate))
      ) {
        return [...usersToRemove, user]
      } else {
        return usersToRemove
      }
    }, [])

  const botActionsChannel = Array.from(bot.channels.values()).find(
    (channel) =>
      channel.type === 'text' && channel.name === botConfig.botActionsChannel
  )

  botActionsChannel.send(`Removing users: ${usersToRemove.join(', ')}`)
}

module.exports = removeInactiveUsers
