import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Post = () => {
  const [posts, setposts] = useState();
  async function fetchPost (){
    const rawData = await fetch("https://instalapi-production.up.railway.app/api/post");
    const data = (await rawData.json());
    setposts(data)
  } 
  
  useEffect(()=>{
    fetchPost();
  }, [])
  return (
    <div style={{display:'flex', justifyContent: 'center'}}>
    <Box sx={{ width: '50%', paddingTop: '3rem', justifyContent:'center' }}>
      <Stack spacing={2} sx={{justifyContent: 'center', display: 'flex'}}>
      {!posts?<CircularProgress></CircularProgress>:
    posts.map((data, ind)=>{
      return(<Item key={ind}>
        <Stack>{data.username}</Stack>
        {data.post}
      </Item>)
    })
    }
      </Stack>
    </Box>

    </div>
  )
}

export default Post