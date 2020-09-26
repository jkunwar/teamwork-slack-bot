const axios = require('axios');
const appConfig = require('../config');


/**
 * Get slack user by email address
 * 
 * @parma string userId, teamwork user id
 * 
 * @return array [tasks], teamwork taks for a user
 * */

const getTasksForUser = async (userId) => {
    const currentDate = new Date().toISOString().split('T')[0];
    const authToken = "Basic " + Buffer.from(appConfig.teamworkToken + ":" + 'Pa$$wOrd').toString("base64");
    try {

        const { data } = await axios({
            method: 'GET',
            url: `${appConfig.teamworkURL}/tasks.json`,
            params: {
                'responsible-party-ids': userId,
                'includeCompletedTasks': true,
                'startDate': '2020-09-01',
                'endDate': currentDate
            },
            headers: {
                Authorization: authToken
            }
        })

        if (data.STATUS == 'OK') {
            return data['todo-items'];
        }

        throw new Error('Something went wrong');
    } catch (error) {
        throw new Error(error);
    }

}

module.exports = {
    getTasksForUser
};