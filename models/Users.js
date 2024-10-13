const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, '`{PATH}` is required'],
        unique: true,
        maxLength: 60,
        minLength: 2

    },
    password: {
        type: String,
        required: [true, '`{PATH}` is required'],
        minLength: 8
    }
});

module.exports = mongoose.model('user', UserSchema);