const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    director_id: {
        type: Schema.Types.ObjectId,
        required: [true, '`{PATH}` is required'],
    },
    title: {
        type: String,
        required: [true, '`{PATH}` is required'],
        maxLength: 50,
        minLength: 1
    },
    category: {
        type: String,
        required: [true, '`{PATH}` is required'],
        maxLength: 30,
        minLength: 1
    },
    country: {
        type: String,
        required: [true, '`{PATH}` is required'],
    },
    year: {
        type: Number,
        required: [true, '`{PATH}` is required'],
        max: 2040,
        min: 1910
    },
    imdb_score: {
        type: Number,
        required: [true, '`{PATH}` is required'],
        max: 10,
        min: 0
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Movie', MovieSchema);