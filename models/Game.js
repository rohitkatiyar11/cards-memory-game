const mongoose = require('mongoose');
const { Schema } = mongoose;

const gameSchema = new Schema({
    difficulty: String,
    errorCounts: Number,
    elapsedTime: Number // Value in seconds
})

mongoose.model('games', gameSchema);