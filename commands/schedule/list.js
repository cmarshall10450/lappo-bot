const fs = require('fs')
const moment = require('moment')

const parseRace = (race) =>
	`Track: ${race.track}
  Date: ${race.date}
  Car class: ${race.carClass}`

const parseSchedule = (schedule) => {
	const scheduleString = schedule
		.filter((race) =>
			moment(race.date).isSameOrAfter(moment(moment().format('yyyy-MM-DD')))
		)
		.sort((a, b) => moment(a.date).diff(b.date))
		.map(parseRace)
		.join('\n\n')
		.replace(/  +/g, '')

	return scheduleString || 'There are no races scheduled'
}

const list = (bot, msg, ...args) => {
	fs.readFile('./schedule.json', (err, data) => {
		if (err) throw err
		let schedule = JSON.parse(data)
		console.log(parseSchedule(schedule))
		msg.channel.send(parseSchedule(schedule))
	})
}

module.exports = list
