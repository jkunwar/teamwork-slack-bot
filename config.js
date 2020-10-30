const appConfig = {
    teamworkURL: process.env.TEAMWORK_URL,
    teamworkToken: process.env.TEAMWORK_TOKEN,
    slack: {
        clientSecret: process.env.SLACK_CLIENT_SECRET,
        botOauthToken: process.env.SLACK_BOT_OAUTH_TOKEN,
        channelID: process.env.SLACK_CHANNEL_ID
    },
    sentry: {
        dsn: process.env.SENTRY_DSN
    },
}

module.exports = appConfig;