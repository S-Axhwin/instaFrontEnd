import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Snackbar } from '@mui/material';
import '../login/login.css'


const NewPost = () => {
  const [username, setUsername] = useState("");
  const [method, setMethod] = useState("login");
  const [blog, setblog] = useState("");
  const [message, setMessage]   = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const fetchApi = async () => {
    const details = (localStorage.getItem('userData'));
    console.log(details);
    const username = JSON.parse(details).username
    console.log(username);
    const res = await fetch(`https://instalapi-production.up.railway.app/api/newpost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        blog: blog
      })
    });
    const data = (await res.json());
    console.log(data);

    if(data.status){
      setMessage(data.reason);
      setOpen(true);
      navigate("/post");
    }else{
      console.error(data.reason);
      setMessage(data.reason);
      setOpen(true)

    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  async function handleSubmit(e){
    e.preventDefault();
    await fetchApi();
  }
  return (
    <>
    <div className="login-container">
      <form onSubmit={(e)=>handleSubmit(e)} className="login-form">
        <input
          type='text'
          placeholder='blog'
          value={blog}
          onChange={(e)=>setblog(e.target.value)}
          required/>
        <button
          onClick={()=>setMethod('login')}
        >
          POST IT
        </button>
      </form>
    </div>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message={message}
      />
    </>
  )
}

export default NewPost