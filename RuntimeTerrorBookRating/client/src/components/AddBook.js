import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import '../style/style.css'


const AddBook =  ({setRefresh}) => {

    //keep track of what is being typed via useState hook
    const [title, setTitle] = useState(""); 
    const [description, setDescription] = useState(""); 
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");
    
    const [language, setLanguage] = useState("");
    const [image, setImage] = useState();
    const [link, setLink] = useState("");
    const [name] = useState([]);
    const [comment] = useState([]);
    const [errors, setErrors] = useState([]);

    //handler when the form is submitted
    const onSubmitHandler = e => {
        e.preventDefault();
        let comments = {
            name: name,
            comment: comment
        }
        const formData = new FormData();
        formData.append('image', image);
        formData.append('title', title);
        formData.append('description', description);
        
        formData.append('author', author);
        formData.append('language', language);
        formData.append('link', link);
        formData.append('genre', genre);
        formData.append('comments', comments);
        
        axios.post('http://localhost:8000/api/books', formData)
            .then(res =>{
                console.log(formData);
                navigate("/");
                setRefresh(true);
            })
            .catch(err => {
                const errRes = err.response.data.errors;
                console.log(err.response);
                const errArr = [];
                for (let key of Object.keys(errRes))
                {
                    errArr.push(errRes[key].message);
                }
                setErrors(errArr);
            });
    }

    return (
        <div className="main">
            <div className="collection">
                <h4 className="newBook">+ Add New Books</h4>
                <form className="formHndler" onSubmit={onSubmitHandler}>
                    
                    <p>{errors.map((err, idx) => {
                            return(
                                <p key={idx} style={{color:"red"}} >{err}</p>
                            )
                        })}
                    </p>
                    <p>
                        <label>Enter Book Title:</label>
                        <input type="text" name="title" onChange={(e)=>setTitle(e.target.value)} value={title}/>
                    </p>
                    <p>
                        <label>Author:</label>
                        <input type="text" name="author" onChange={(e)=>setAuthor(e.target.value)} value={author}/>
                    </p>
                    <p>
                        <label>Genre:</label>
                        <input type="text" name="genre" onChange={(e)=>setGenre(e.target.value)} value={genre}/>
                    </p>
                    <p>
                        <label>Long Describtion:</label>
                        <textarea  name="description" cols="30" rows="4" onChange={(e) => setDescription(e.target.value)} ></textarea>
                    </p>
                    <p>
                        <label>Languge(s):</label>
                        <input type="text" name="language" onChange={(e)=>setLanguage(e.target.value)} value={language}/>
                    </p>
                    <p>
                        <label htmlFor="formFile" className="form-label">Image of the Book: </label>
                        <input  className="form-control file" type="file" name="image" onChange={e => setImage(e.target.files[0])}/>
                    </p>
                    <p>
                        <label>Link to where it can be found or baught:</label>
                        <input type="url" name="link" onChange={(e)=>setLink(e.target.value)} value={link}/>
                    </p>
                    <p className="collectButton">
                        <button onClick={e => navigate("/")} className="btn btn buttonForm" type="submit">Cancel</button>  
                        <button className="btn btn buttonForm" type="submit">Add Book</button>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default AddBook;