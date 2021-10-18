import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import '../style/style.css'


const BookDetails = (props) => {
    const [books, setBooks] = useState({});
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(-1);

    let bookRating = -1;

    const [update, setUpdate] = useState(false);
    let poster = books.image?`http://localhost:8000/${books.image}`:"";

    useEffect(() => {
        axios.get("http://localhost:8000/api/books/" + props.id)
            .then(res => {
                setBooks(res.data);
                console.log(res.data);
                setUpdate(false);
            })
            .catch(err => console.log(err))
    }, [props.id, update])

    const deleteBook = (bookId) => {
        axios.delete('http://localhost:8000/api/books/' + bookId)
            .then(res => {
                props.setRefresh(true);
                navigate("/");
            })
            .catch(err => console.log(err))
    }

    const commentFormHandler = (e) => {
        e.preventDefault();

        let allNames = [...books.comments.name, name];
        let allComments = [...books.comments.comment, comment];
        let allRating = [...books.comments.rating, rating];

        let comments = {
            name: allNames,
            comment: allComments,
            rating: allRating,
        }

        axios.put('http://localhost:8000/api/books/' + props.id, {comments})
            .then(res => { 
                console.log(res.data);
                setUpdate(true);
            })
            .catch(err => console.log(err))

        setName("");
        setComment("")
        setRating(-1)
            
    }

    const ratingHandler = idx =>{
        setRating(idx);
        for (let i = 0; i < idx+1; i++) {
            document.getElementById(i).className = "fas fa-star pointer";
        }
        for (let i = idx+1; i < 5; i++) {
            document.getElementById(i).className = "far fa-star pointer";
        }
    }

    const ratingHover = idx =>{
        
        if(rating === -1){
            for (let i = 0; i < idx+1; i++) {
                document.getElementById(i).className = "fas fa-star pointer";
            }
            for (let i = idx+1; i < 5; i++) {
                document.getElementById(i).className = "far fa-star pointer";
            }
        }
        
        
    }

    const calcRating = () =>{
        for (let i = 0; i < books.comments.rating.length; i++) {
            bookRating += books.comments.rating[i];
        }
        bookRating = Math.round((bookRating+1)/books.comments.rating.length);
    }
    
    return (
        books.comments ?
        <div className="container wrapper">
            <div className="bookContainer">
                <img src={poster} alt="Book Poster" />
                <div className="detailes">
                    <h6 className="review">BOOK REVIEWS</h6>
                    <span className="iconTitle">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-star-fill" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zM8.16 4.1a.178.178 0 0 0-.32 0l-.634 1.285a.178.178 0 0 1-.134.098l-1.42.206a.178.178 0 0 0-.098.303L6.58 6.993c.042.041.061.1.051.158L6.39 8.565a.178.178 0 0 0 .258.187l1.27-.668a.178.178 0 0 1 .165 0l1.27.668a.178.178 0 0 0 .257-.187L9.368 7.15a.178.178 0 0 1 .05-.158l1.028-1.001a.178.178 0 0 0-.098-.303l-1.42-.206a.178.178 0 0 1-.134-.098L8.16 4.1z"/>
                        </svg>
                        <span className="bookTitle">{books.title}</span>
                        {calcRating()}
                    <h4>
                {       bookRating === 0?
                            <div className="commentRating" >
                                <i className={"fas fa-star"}></i>
                                <i className={"far fa-star"}></i>
                                <i className={"far fa-star"}></i>
                                <i className={"far fa-star"}></i>
                                <i className={"far fa-star"}></i>
                            </div>
                        :
                        bookRating === 1?
                            <div className="commentRating" >
                                <i className={"fas fa-star"}></i>
                                <i className={"fas fa-star"}></i>
                                <i className={"far fa-star"}></i>
                                <i className={"far fa-star"}></i>
                                <i className={"far fa-star"}></i>
                            </div>
                        :
                        bookRating === 2?
                            <div className="commentRating" >
                                <i className={"fas fa-star"}></i>
                                <i className={"fas fa-star"}></i>
                                <i className={"fas fa-star"}></i>
                                <i className={"far fa-star"}></i>
                                <i className={"far fa-star"}></i>
                            </div>
                        :
                        bookRating === 3?
                            <div className="commentRating" >
                                <i className={"fas fa-star"}></i>
                                <i className={"fas fa-star"}></i>
                                <i className={"fas fa-star"}></i>
                                <i className={"fas fa-star"}></i>
                                <i className={"far fa-star"}></i>
                            </div>
                        :
                        bookRating === 4?
                            <div className="commentRating" >
                                <i className={"fas fa-star"}></i>
                                <i className={"fas fa-star"}></i>
                                <i className={"fas fa-star"}></i>
                                <i className={"fas fa-star"}></i>
                                <i className={"fas fa-star"}></i>
                            </div>
                        :
                            <div className="commentRating" >
                                <i className={"far fa-star"}></i>
                                <i className={"far fa-star"}></i>
                                <i className={"far fa-star"}></i>
                                <i className={"far fa-star"}></i>
                                <i className={"far fa-star"}></i>
                            </div>
                            }
                        </h4>
                    </span>
                    <span className="inline">
                        <h5>by</h5><h5 className="author"> {books.author}</h5>
                    </span>
                    <div><strong>Genre: </strong><p className="color">{books.genre}</p></div>
                    <div><strong>Languge(s): </strong><p className="color">{books.language}</p></div>
                    <div><strong>Where to buy: </strong> <a className="color" href={books.link} target="_blank" rel="noopener noreferrer">{books.link}</a> </div>
                </div>
            </div>
            <h4 className="commentsSection" >Comments:</h4>
            {
                books.comments.name.map((name, idx)=>{
                    return(
                        <div className="comment" key={idx}>
                            <label id="name" ><strong>Name: {name}</strong></label>
                            {books.comments.rating[idx] === 0?
                                <div className="commentRating" >
                                    <i className={"fas fa-star"}></i>
                                    <i className={"far fa-star"}></i>
                                    <i className={"far fa-star"}></i>
                                    <i className={"far fa-star"}></i>
                                    <i className={"far fa-star"}></i>
                                </div>
                            :
                            books.comments.rating[idx] === 1?
                                <div className="commentRating" >
                                    <i className={"fas fa-star"}></i>
                                    <i className={"fas fa-star"}></i>
                                    <i className={"far fa-star"}></i>
                                    <i className={"far fa-star"}></i>
                                    <i className={"far fa-star"}></i>
                                </div>
                            :
                            books.comments.rating[idx] === 2?
                                <div className="commentRating" >
                                    <i className={"fas fa-star"}></i>
                                    <i className={"fas fa-star"}></i>
                                    <i className={"fas fa-star"}></i>
                                    <i className={"far fa-star"}></i>
                                    <i className={"far fa-star"}></i>
                                </div>
                            :
                            books.comments.rating[idx] === 3?
                                <div className="commentRating" >
                                    <i className={"fas fa-star"}></i>
                                    <i className={"fas fa-star"}></i>
                                    <i className={"fas fa-star"}></i>
                                    <i className={"fas fa-star"}></i>
                                    <i className={"far fa-star"}></i>
                                </div>
                            :
                            books.comments.rating[idx] === 4?
                                <div className="commentRating" >
                                    <i className={"fas fa-star"}></i>
                                    <i className={"fas fa-star"}></i>
                                    <i className={"fas fa-star"}></i>
                                    <i className={"fas fa-star"}></i>
                                    <i className={"fas fa-star"}></i>
                                </div>
                            :
                                <div className="commentRating" >
                                    <i className={"far fa-star"}></i>
                                    <i className={"far fa-star"}></i>
                                    <i className={"far fa-star"}></i>
                                    <i className={"far fa-star"}></i>
                                    <i className={"far fa-star"}></i>
                                </div>
                            }
                            <p className="comm" > <strong>Comment: </strong> {books.comments.comment[idx]}</p>
                        </div>
                    )
                })
            }

            <br />
            <h4>Describtion :</h4>
            <div className="description">
                <p>{books.description}</p>
            </div>     

        <form onSubmit={commentFormHandler} >
                <div>
                    <label>Name</label><br />
                    <input type="text" className="comName" onChange={e => setName(e.target.value)} value={name} />
                </div>
                <div className="rating">
                    <p><strong>Rating: </strong>
                        <i className={"far fa-star pointer"} id="0" onClick={()=>ratingHandler(0)} onMouseEnter={()=>ratingHover(0)}></i>
                        <i className={"far fa-star pointer"} id="1" onClick={()=>ratingHandler(1)} onMouseEnter={()=>ratingHover(1)}></i>
                        <i className={"far fa-star pointer"} id="2" onClick={()=>ratingHandler(2)} onMouseEnter={()=>ratingHover(2)}></i>
                        <i className={"far fa-star pointer"} id="3" onClick={()=>ratingHandler(3)} onMouseEnter={()=>ratingHover(3)}></i>
                        <i className={"far fa-star pointer"} id="4" onClick={()=>ratingHandler(4)} onMouseEnter={()=>ratingHover(4)}></i>
                    </p>
                </div>
                <div>
                    <label>Comment</label><br />
                    <textarea cols="50" rows="6"  onChange={e => setComment(e.target.value)} value={comment} ></textarea>
                </div>
                <button className="btn btn buttonForm">Post</button>
            </form>      

            <br/><br/>
            <div><button className="btn btn buttonEdit" onClick={()=>{navigate(`/books/edit/${books._id}`)}} >Edit Book Details</button></div>
            <div><button className="btn btn buttonDel" onClick={(e)=>{deleteBook(books._id)}}>Delete Book</button></div><br/>
        </div>
        :
        ""
    )
}

export default BookDetails;