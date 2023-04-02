import mongoose from 'mongoose'

const fishSchema = mongoose.Schema({
    name: String,
    type: String,
    scientificName: String,
    maxLength: String,
    family: String,
    remark: String,
    image: String
})

const Fishes = mongoose.model('Fishes', fishSchema)

export default Fishes