const config = require('../config');
const Sentry = require("@sentry/node");
Sentry.init({
    dsn: config.sentry.dsn
});

function log(error) {
    Sentry.captureException(error);
}

module.exports = { log };