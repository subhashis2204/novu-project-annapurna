const mongoose = require('mongoose')

const { subscribeUser } = require('../utils/subscribeNovu')

const receiverSchema = new mongoose.Schema({
    username: String,
    receiverName: String,
    receiverAreaOfWork: [String],
    receiverWebsite: String,
    receiverContactDetails: {
        contact1: String,
        contact2: String,
        email: {
            type: String,
            requried: true,
            validate: {
                validator: (value) => {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // Validate email address format
                },
                message: 'Invalid email address'
            }
        }
    },
    receiverAddress: {
        country: String,
        state: String,
        city: String,
        zip: String,
        street: String,
        geometry: {
            type: {
                type: String,
                enum: ['Point'],
                required: true
            },
            coordinates: {
                type: [Number],
                required: true
            }
        }
    },
    receiverDescription: String,
    receiverRegistrationNo: String,
    idProofImg: {
        url: String,
        blobName: String
    },
    fcmToken: String,
    subscribed: {
        type: Boolean,
        default: false
    }
})

receiverSchema.index({ 'receiverAddress.geometry': '2dsphere' });

receiverSchema.pre('findOneAndUpdate', async function () {
    console.log(this._update)
    const address = this._update.receiverAddress

    const options = {
        address: `${this.receiverSchemaName},${address.street}, ${address.city}, ${address.state},${address.zip}, ${address.country}`,
        key: process.env.GOOGLEMAP_TOKEN
    }
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', { params: options })

    const { lat, lng } = response.data.results[0].geometry.location
    const geometry = {
        type: 'Point',
        coordinates: [lng, lat]
    }
    this._update.receiverAddress.geometry = geometry
})

receiverSchema.post('save', async function (receiver) {
    subscribeUser(receiver._id, receiver.receiverContactDetails.email)
})

const Receiver = mongoose.model('Receiver', receiverSchema)

module.exports = Receiver
