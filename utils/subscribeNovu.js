require('dotenv').config()

const { Novu } = require('@novu/node');
const novu = new Novu(process.env.NOVU_TOKEN);

module.exports.subscribeUser = async function (receiverId, receiverEmail) {
    try {
        await novu.subscribers.identify(receiverId, {
            email: receiverEmail
        })
    } catch (err) {
        console.log(err)
    }
}
