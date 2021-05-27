const greet = ({ message, args }) => {
  const { name } = args
  message.channel.send(`Hey, ${name}`)
}

module.exports = greet
