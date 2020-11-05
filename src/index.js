import { App, LogLevel } from '@slack/bolt'
import dotenv from 'dotenv'

dotenv.config()

const app = new App({
	signingSecret: process.env.SLACK_SIGNING_SECRET,
	logLevel: LogLevel.INFO,
	token: process.env.SLACK_BOT_TOKEN,
	endpoints: {
		events: '/slack/events',
		commands: '/slack/commands',
	},
})

app.command('/chess', async ({ command, ack, say }) => {
	await ack()

	await say(`${command.text}`)
})

app.error((error) => {
	console.error(error)
})

;(async () => {
	const port = process.env.PORT || 3000
	await app.start(port)
	console.info('Bolt Started')
})()
