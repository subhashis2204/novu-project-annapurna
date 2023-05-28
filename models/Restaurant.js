const mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema({
    username: String,
    restaurantName: String,
    restaurantContactDetails: {
        email: {
            type: String,
            required: true,
            validate: {
                validator: (value) => {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // Validate email address format
                },
                message: 'Invalid email address'
            }
        },
        contact1: String,
        contact2: String
    },
    restaurantWebsite: {
        type: String,
        required: true
    },
    restaurantAddress: {
        postalCode: String,
        city: String,
        state: String,
        street: String,
        country: String,
        zip: String,
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
    restaurantDescription: String
});

restaurantSchema.index({ 'restaurantAddress.geometry': '2dsphere' });

restaurantSchema.pre('findOneAndUpdate', async function () {
    console.log(this._update)
    const address = this._update.restaurantAddress

    const options = {
        address: `${this.restaurantName},${address.street}, ${address.city}, ${address.state},${address.zip}, ${address.country}`,
        key: process.env.GOOGLEMAP_TOKEN
    }
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', { params: options })

    const { lat, lng } = response.data.results[0].geometry.location
    const geometry = {
        type: 'Point',
        coordinates: [lng, lat]
    }
    this._update.restaurantAddress.geometry = geometry
    console.log(response.data.results[0].geometry)
})

const Restaurant = mongoose.model('Restaurant', restaurantSchema)

module.exports = Restaurant
