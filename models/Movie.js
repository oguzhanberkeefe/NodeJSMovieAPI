const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    director_id: {
        type: Schema.Types.ObjectId,
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
    },
    country: {
        type: String,
    },
    year: {
        type: Number,
    },
    imdb_score: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
    
});

module.exports = mongoose.model('Movie', MovieSchema);