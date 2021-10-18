const BookController = require('../controllers/book');

const upload = require('../middleware/upload')

module.exports = function(app){
    app.get('/api/books', BookController.allBooks);
    app.get('/api/books/:id', BookController.oneBook);
    app.post('/api/books', upload.single('image'), BookController.createBook);
    app.delete('/api/books/:id', BookController.deleteBook);
    app.post("/api/books/:id", upload.single('image'), BookController.updateBook);
    app.put("/api/books/:id", upload.single('image'), BookController.updateBook);
}