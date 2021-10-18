import React from 'react'
import { Link } from '@reach/router';
import '../style/style.css'

const BooksList = ({ books }) => {
    
    return (
        <div className="wrapper" style={{textAlign: 'center'}}>
            <br/><br/>
            <table className="table mx-auto">
                <tbody>
                    {
                        books.map((book, idx)=>{
                            return(
                                <tr key={idx}>
                                    <td>
                                        <Link className="title" to={`/books/${book._id}`}> {book.title}</Link><br/>
                                        <Link to={`/books/${book._id}`}><img style={{width: "200px", height: "auto" }} src={"http://localhost:8000/" + book.image} alt="Book Poster" /></Link><br/>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default BooksList;