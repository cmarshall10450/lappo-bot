const fs = require('fs')

const add = (bot, msg, ...args) => {
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
		})
	})
}

module.exports = add
