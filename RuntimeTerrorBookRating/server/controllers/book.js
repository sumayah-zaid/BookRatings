const { Book } = require("../models/Book");

module.exports = {

    createBook: (req, res) => {
        const {title, description, likes, comments, language, genre, author, link} = req.body;
        const image = req.file.path;
        Book.create({
            title,
            description, 
            likes,
            comments,
            image,
            language,
            genre,
            author,
            link
        })
        .then(book => res.json(book))
        .catch( err => res.json(err))
    },

    allBooks: (req, res) => {
        Book.find()
            .then(book => res.json(book))
            .catch( err => res.status(400).json(err))
    },

    oneBook: (req, res) => {
        Book.findOne({_id: req.params.id})
            .then(book => res.json(book))
            .catch( err => res.status(400).json(err))
    },

    deleteBook: (req, res) => {
        Book.deleteOne({_id: req.params.id})
            .then( con => res.json(con))
            .catch( err => res.status(400).json(err))
    },

    updateBook: (req, res) => {

        let body = JSON.parse(JSON.stringify(req.body));;

        if (req.hasOwnProperty('file')) {
            const image = req.file.path;
            body = {...body, image}
        }
        
        Book.findOneAndUpdate({_id: req.params.id}, body, {new:true, runValidators: true, useFindAndModify: false})
            .then(book => res.json(book))
            .catch( err => res.json(err))
    }
}