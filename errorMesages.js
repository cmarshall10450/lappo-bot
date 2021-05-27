const INSUFFICIENT_PERMISSIONS =
	'You do not have the correct permissions for this command. Please contact an admin if you think this is incorrect'

const INSUFFICIENT_ROLES =
	'You do not have the correct roles for this command. Please contact an admin if you think this is incorrect'

const INCORRECT_NUMBER_OF_ARGUMENTS = (actual, expected) =>
	`You provided the incorrect number of arguments. ${expected} were expected, but ${actual} were given.`

module.exports = {
	INSUFFICIENT_PERMISSIONS,
	INSUFFICIENT_ROLES,
	INCORRECT_NUMBER_OF_ARGUMENTS,
}
