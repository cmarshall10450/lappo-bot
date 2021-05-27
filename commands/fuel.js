const fuel = ({ message, args }) => {
	const { raceLength, lapTime, fuelPerLap, isSafe } = args

	const raceLengthSecs = Number(raceLength) * 60
	const lapTimeRegex = /(\d{1,3}):(\d{2}).(\d{3})/
	const [_, mins, secs, millis] = lapTime.match(lapTimeRegex).map(Number)
	const lapTimeSecs = mins * 60 + secs + millis / 1000

	const numLaps = raceLengthSecs / lapTimeSecs
	let fuelRequired = numLaps * fuelPerLap

	if (isSafe === 'true') {
		fuelRequired += Number(fuelPerLap) * 1.15
	}

	message.reply(`You need ${fuelRequired.toFixed(2)}L to finish the race.`)
}

module.exports = fuel
