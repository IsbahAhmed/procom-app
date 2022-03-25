import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Board from '../../Components/Board/Board';

const Home = () => {
  const user = useSelector((state)=> state.user);
  const navigate = useNavigate()

  useEffect(()=>{
    if(!user?.token) navigate("/auth")
  },[user])
  return (
    <>
    <Board/>
    </>
    
  )
}

export default Home