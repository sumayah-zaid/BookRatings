import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { navigate } from '@reach/router';
import '../style/style.css'

const UpdateBook =  props => {
    const { id, setRefresh } = props;
    const [title, setTitle] = useState(""); 
    const [description, setDescription] = useState(""); 
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");
    const [language, setLanguage] = useState("");
    const [image, setImage] = useState();
    const [link, setLink] = useState("");

    useEffect(() => {
        axios.get('http://localhost:8000/api/books/' + id)
            .then(res => {
                setTitle(res.data.title);
                setDescription(res.data.description);
                setAuthor(res.data.author);
                setGenre(res.data.genre);
                setLanguage(res.data.language);
                setLink(res.data.link);

            })
    }, [id])
    const updatedBook = e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', image);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('author', author);
        formData.append('language', language);
        formData.append('link', link);
        formData.append('genre', genre);
        formData.append('_methot', 'PUT');

        axios.post('http://localhost:8000/api/books/'+id, formData)
            .then(res =>{
                console.log(formData);
                navigate("/");
                setRefresh(true);
            })
            .catch(err => {
                console.log(err);
            });
    }
    return (
        <div>
            <div className="collection">
                {/* <p><Link to={`/`}>Back to Home</Link></p> */}
                <h4 className="newBook">Edit {title}</h4>
                <form className="formHndler" onSubmit={updatedBook}>
                <p>
                    <label>Book Title:</label>
                    <input type="text" onChange={(e)=>setTitle(e.target.value)} value={title}/>
                </p>
                <p>
                    <label>Description:</label>
                    <textarea name="" cols="30" rows="6"  onChange={(e)=>setDescription(e.target.value)} value={description}></textarea>
                </p>
                <p>
                    <label>Change the image of the Book: </label>
                    <input  className="form-control file" type="file" name="image" onChange={e => setImage(e.target.files[0])}/>
                </p>
                <p>
                    <label>Author:</label>
                    <input type="text" onChange={(e)=>setAuthor(e.target.value)} value={author}/>
                </p>
                <p>
                    <label>Genre:</label>
                    <input type="text" onChange={(e)=>setGenre(e.target.value)} value={genre}/>
                </p>
                <p>
                    <label>Languge(s):</label>
                    <input type="text" onChange={(e)=>setLanguage(e.target.value)} value={language}/>
                </p>
                <p>
                    <label>Link to where it can be found or baught:</label>
                    <input type="url" onChange={(e)=>setLink(e.target.value)} value={link}/>
                </p>
                <p className="collectButton">
                        <button onClick={e => navigate("/")} className="btn btn buttonForm" type="submit">Cancel</button>  
                        <button className="btn btn buttonForm" type="submit">Edit Book</button>
                </p>
                </form>
            </div>
        </div>
    )
}

export default UpdateBook;