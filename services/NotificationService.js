const TeamworkServices = require('./TeamworkServices');
const SlackServices = require('./SlackServices');

const notifySlack = async (teamworkEvent) => {

    try {
        const users = teamworkEvent.users;
        users.forEach(async (user) => {

            const userTasks = await TeamworkServices.getTasksForUser(user.id);
            const completedTasks = userTasks.filter(task => task.completed == true);
            const completedTaskCount = completedTasks.length;

            const slackUser = await SlackServices.getUserByEmail(user.email);
            const message = `Hey team, lets congratulate <@${slackUser.id}> for completing ${completedTaskCount} tasks in teamwork`;
            await SlackServices.postMessage(message);
        });

    } catch (error) {
        throw new Error(error);
    }

}

module.exports = {
    notifySlack
}