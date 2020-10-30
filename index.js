require('dotenv').config();

const cors = require('cors');
const express = require('express');
const sentry = require('./utils/sentry');
const bodyparser = require('body-parser');
const { taskCompleted } = require('./controller/TeamworkController');
const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors());

app.post('/api/task-completed', taskCompleted)


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`server running at http://localhost:${PORT}`));

process.on('unhandledRejection', err => {
    console.error('Unhandled rejection', err);

    try {
        sentry.log(err);
    } catch (err) {
        console.error('error', err);
    } finally {
        process.exit(1);
    }
});

process.on('uncaughtException', err => {
    console.error(`Uncaught exception: ${err}`);
    try {
        sentry.log(err);
    } catch (err) {
        console.error(`error: ${err}`);
    } finally {
        process.exit(1);
    }
});