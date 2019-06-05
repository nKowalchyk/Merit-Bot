'user strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    merits: {
        type: Number,
        default: 0
    },
    demerits: {
        type: Number,
        default: 0
    },
    permissions: {
        type: String,
        default: '0000'
    }
});

module.exports = mongoose.model('Users', UserSchema, 'MeritUsers');