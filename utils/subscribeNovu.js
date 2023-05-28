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


module.exports.sendDonationNotification = async function (restaurantName, targetReceivers) {
    targetReceivers.forEach(async receiver => {

        console.log(receiver)

        if (!receiver.subscribed) return;

        await novu.subscribers.setCredentials(receiver._id, 'fcm', {
            deviceTokens: [receiver.fcmToken]
        })

        novu.trigger('donation-notification', {
            to: {
                subscriberId: receiver._id,
            },
            payload: {
                restaurant_name: restaurantName,
            }
        });

    })
}
