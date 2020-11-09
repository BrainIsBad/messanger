const {Schema, Types, model} = require('mongoose')

const schema = new Schema({
    text: {type: String, required: true},
    date: {type: Date, required: true, default: Date.now()},
    room: {type: Types.ObjectId, ref: 'Room'},
    user: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Message', schema)

