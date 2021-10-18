
const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({

    title: { 
        type: String,
    },
    
    description: {
        type: String,
    },

    comments:{
        name: [String],
        comment: [String],
        rating: [Number]
    } ,

    image: {
        type: String,
    },

    language: {
        type: String
    },

    genre:{
        type: String
    },

    author:{
        type: String
    },

    link: {
        type: String
    }
    
}, { timestamps: true });

module.exports.Book = mongoose.model('Book', BookSchema);


