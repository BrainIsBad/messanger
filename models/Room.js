const {Schema, Types, model} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true},
    messages: [{type: Types.ObjectId, ref: 'Message'}],
    users: [{type: Types.ObjectId, ref: 'User'}]
})

module.exports = model('Room', schema)

