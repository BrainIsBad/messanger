const {Schema, Types, model} = require('mongoose')

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    messages: [{type: Types.ObjectId, ref: 'Message'}],
    rooms: [{type: Types.ObjectId, ref: 'Room'}]
})

module.exports = model('User', schema)

