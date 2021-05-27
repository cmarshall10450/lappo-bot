const fs = require('fs')

const add = ({ message, args }) => {
  const [track, date, carClass] = args
  fs.readFile('./schedule.json', function (err, data) {
    const schedule = JSON.parse(data)
    schedule.push({
      track,
      date,
      carClass,
    })

    fs.writeFile('./schedule.json', JSON.stringify(schedule), (err) => {
      if (err) {
        console.error(err)
        return
      }
      message.channel.send(`Race at ${track} was added to the schedule`)
    })
  })
}

module.exports = add
