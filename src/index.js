import { App, LogLevel } from '@slack/bolt'
import dotenv from 'dotenv'

dotenv.config()

const app = new App({
	signingSecret: process.env.SLACK_SIGNING_SECRET,
	logLevel: LogLevel.DEBUG,
	token: process.env.SLACK_BOT_TOKEN,
	endpoints: {
		events: '/slack/events',
		commands: '/slack/commands',
	},
})

app.command('/chess', async ({ command, ack, say }) => {
	await ack()

	await say(`${command.text}, (${command.user_name})`)
})

app.error((/** @type Error */ err) => {
	if (err.code === 'slack_webapi_platform_error') {
		if (err.data.error === 'not_in_channel') {
			console.error('NOT IN CHANNEL')
		}
	}
	console.error(err)
})

;(async () => {
	const port = process.env.PORT || 3000
	await app.start(port)
	console.info('Bolt Started')
})()
