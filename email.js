require('dotenv').config()

const { Novu } = require('@novu/node');
const novu = new Novu(process.env.NOVU_TOKEN);

module.exports.sendVerifyEmail = async function (receiverId, generatedOTP) {
    try {
        await novu.trigger('send-otp', { to: receiverId, payload: { otp: generatedOTP } });
    } catch (err) {
        console.log('some error occured in sending OTP')
    }
}

module.exports.sendMessage = async function (replyTo, senderName, messageText) {

    const emailBody = createMessageEmailBody(replyTo, senderName, messageText)

    const emailOptions = {
        from: process.env.SENDER_MAIL,
        to: {
            name: process.env.CONTACTS_EMAIL_NAME,
            address: process.env.CONTACTS_EMAIL
        },
        replyTo: {
            name: senderName,
            address: replyTo
        },
        subject: 'Help and Support Needed',
        html: emailBody
    }

    transporter.sendMail(emailOptions)
        .then((response) => console.log(response))
        .catch((err) => console.log(err))
}
