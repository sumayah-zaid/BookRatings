import React, {useState, useEffect} from 'react';
import {Router} from '@reach/router';
import BooksList from './BooksList';
import axios from 'axios';
import AddBook from './AddBook';
import UpdateBook from './UpdateBook';
import BookDetails from './BookDetails';
import NavBar from './NavBar';
import Footer from './Footer';
import '../style/style.css'

const BooksParent = () => {

    const [books, setBooks] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8000/api/books")
            .then(res => {
                setBooks(res.data);
                setRefresh(false);
            })
            .catch(err=>console.log(err));
    }, [refresh]);

    return (
        <div>
            <NavBar />
            <Router>
                <BooksList path={"/"} books={books} />
                <AddBook path={"/books/new"} setRefresh={setRefresh} />
                <UpdateBook path={"/books/edit/:id"} setRefresh={setRefresh} />
                <BookDetails path={"/books/:id"} books={books} setRefresh={setRefresh} />
            </Router>
            <Footer />
        </div>
    );
};

export default BooksParent;