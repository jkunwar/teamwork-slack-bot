const sentry = require('../utils/sentry');
const NotificationService = require('../services/NotificationService');

const taskCompleted = async (req, res) => {
    try {
        await NotificationService.notifySlack(req.body);

        return res.status(200).send({ status: 'success' });

    } catch (error) {
        console.log(error.message)
        sentry.log(error);
        return res.status(400).send({ status: 'error' });
    }
}

module.exports = {
    taskCompleted,
};