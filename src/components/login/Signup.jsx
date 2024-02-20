import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Snackbar } from '@mui/material';
import './login.css'

const Reg = ({setAuth}) => {
  const [method, setMethod] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage]   = useState("");
  const [open, setOpen] = useState(false);
  const [confpassword, setconfPassword] = useState("");
  const navigate = useNavigate();

  const fetchApi = async () => {
    console.log(username);
    console.log(password);
    if(confpassword===password){
    const res = await fetch(`https://instalapi-production.up.railway.app/api/auth/reg`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    });
    const data = (await res.json());
    console.log(data);

    if(data.status){
      localStorage.setItem("userData", JSON.stringify({
        username: username,
        password: password
      }))
      setMessage(data.reason);
      setOpen(true);
      navigate("/post");
    }else{
      console.error(data.reason);
      setMessage(data.reason);
      setOpen(true)

    }}
    else{
      setOpen(true);
      setMessage("confirm the password")
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
          placeholder='username'
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          required/> 
        <input
          type='password'
          placeholder='password'
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required/>
        <input
          type='password'
          placeholder='password'
          value={confpassword}
          onChange={(e)=>setconfPassword(e.target.value)}
          required/>
        <button
          onClick={()=>setMethod('login')}
        >
          SIGNUP
        </button>
      </form>
    </div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
      />
    </>
  )
}

export default Reg