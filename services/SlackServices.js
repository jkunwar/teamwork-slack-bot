const axios = require('axios');
const { slack } = require('../config');

/**
 * Get slack user by email address
 * 
 * @parma string email
 * 
 * @return object {user}, Slack user object
 * */
const getUserByEmail = async (email) => {
    try {

        const user = await axios({
            method: 'GET',
            url: `https://slack.com/api/users.lookupByEmail`,
            params: {
                email: email
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${slack.botOauthToken}`
            }
        });

        return user.data.user;
    } catch (error) {
        throw new Error(error)
    }


}

/**
 * Send message to slack general channel
 * 
 * @parma any message
 * 
 * @return
 * */
const postMessage = async (message) => {

    axios({
        method: 'POST',
        url: `https://slack.com/api/chat.postMessage`,
        data: {
            channel: slack.channelID,
            text: message
        },
        headers: {
            'Authorization': `Bearer ${slack.botOauthToken}`
        }
    })
        .then(res => console.log(res.data))
        .catch(err => console.log(err))

}

module.exports = {
    getUserByEmail,
    postMessage
}