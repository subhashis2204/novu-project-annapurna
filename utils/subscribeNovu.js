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

module.exports.sendContactMessage = async function (inquirerMessage, inquirerEmail, inquirerName) {
    novu.trigger('send-message', {
        to: {
            subscriberId: '101',
            email: process.env.RESPONDER_EMAIL
        },
        payload: {
            name: inquirerName,
            email: inquirerEmail,
            message: inquirerMessage
        },
        overrides: {
            email: {
                to: [process.env.RESPONDER_EMAIL],
                from: process.env.NOTIFICATION_EMAIL,
                replyTo: inquirerEmail
            }
        }
    });
}

module.exports.sendDonationNotification = async function (restaurantName, restaurantId, targetReceivers) {
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
            },
            overrides: {
                fcm: {
                    android: {},
                    apns: {},
                    webPush: {
                        fcmOptions: {
                            link: 'https://novu-project-annapurna.azurewebsites.net/restaurants/' + restaurantId
                        },
                        notification: {
                            icon: 'http://cdn.mcauto-images-production.sendgrid.net/2047cbcd71aa177b/9fc63d84-8af5-4e61-a72d-c9aa96d57688/100x100.png'
                        }
                    },
                    fcmOptions: {}
                },
            }
        });

    })
}
