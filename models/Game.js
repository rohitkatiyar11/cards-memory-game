const mongoose = require('mongoose');
const { Schema } = mongoose;

const gameSchema = new Schema({
    difficulty: String,
    erros: Number,
})

mongoose.model('games', gameSchema);