const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DirectorSchema = new Schema({
    name: {
        type: String,
        required: [true, '`{PATH}` is required'],
        maxLength: 60,
        minLength: 2
    },
    surname: {
        type: String,
        required: [true, '`{PATH}` is required'],
        maxLength: 60,
        minLength: 2
    },
    bio: {
        type: String,
        maxLength: 1000,
        minLength: 10
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Director', DirectorSchema);