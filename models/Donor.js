const mongoose = require('mongoose')
const Restaurant = require('./Restaurant')
const Receiver = require('./Receiver')
const { sendDonationNotification } = require('../utils/subscribeNovu')

const donorSchema = new mongoose.Schema({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    restaurantName: String,
    date: Date,
    donating: Boolean,
    fulfilled: Boolean,
    donatedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Receiver'
    },
    otpGenerated: {
        type: Boolean,
        default: false
    },
    otpVerified: {
        type: Boolean,
        default: false
    }
})

donorSchema.post('save', async function (doc) {
    const restaurant = await Restaurant.findById(doc.restaurantId)
    const location = restaurant.restaurantAddress.geometry

    const targetReceivers = await Receiver.aggregate([{
        $geoNear: {
            near: location,
            distanceField: "distance",
            maxDistance: 10000,
            spherical: true
        }
    },
    {
        $project: {
            _id: 1,
            subscribed: 1,
            fcmToken: 1
        }
    }
    ])

    sendDonationNotification(restaurant.restaurantName, restaurant._id, targetReceivers)

})

const Donor = mongoose.model('Donor', donorSchema)
module.exports = Donor
