require('dotenv').config()

const { Novu, PushProviderIdEnum } = require('@novu/node');
const novu = new Novu(process.env.NOVU_TOKEN);

module.exports.subscribeUser = async function(receiverId, receiverEmail) {
    try {
        await novu.subscribers.identify(receiverId, {
            email: receiverEmail
        })
    } catch (err) {
        console.log(err)
    }
}


module.exports.sendDonationNotification = async function(restaurantName, targetReceivers) {
    targetReceivers.forEach(async receiver => {

        console.log(receiver)

        await novu.subscribers.setCredentials(receiver._id, 'fcm', {
            deviceTokens: [receiver.fcmToken]
        })

        const subscriber = await novu.subscribers.get(receiver._id)
        console.log(subscriber.data.data.channels[0].credentials.deviceTokens)

        novu.trigger('donation-notification', {
            to: {
                subscriberId: receiver._id,
            },
            payload: {
                restaurant_name: restaurantName
            }
        });

    })
}