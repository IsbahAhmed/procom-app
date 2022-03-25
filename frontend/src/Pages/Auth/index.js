import React, { useEffect, useRef } from 'react';
import "./auth.css";
import StyledButton from "../../Components/StyledButton/StyledButton"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import { useSelector } from 'react-redux';
const Auth = (props) => {
  const {hash} = useLocation();
  const ref = useRef();
  const navigate = useNavigate()
  const user = useSelector((state)=> state.user);
  useEffect(()=>{
    if(hash === "#signup") ref.current.innerText = "SIGN UP";
    else ref.current.innerText = "SIGN IN";
  },[hash])
  useEffect(()=>{
    if(user?.token) navigate("/")
  },[user])
  return (
    <div className='auth-page'>
      <div className="row mx-0">
        <div className="col-md-7">
          <div className="auth-header">
            <h5 className='ml-5 mt-4 text-bold text-grey'>
              <span className='text-primary'>LINED</span>UP
            </h5>
          </div>
          <div className="main-auth mt-5 container px-5">
            <h1 className='text-heavy text-primary h-style' ref={ref}>SIGN IN</h1>
            {
              hash !== "#signup" ? <Login/> : <Signup/>
            }
          </div>
        </div>
        <div className="col-md-5 auth-right">
            <h2 className='text-bold'>
              HEY BUDDY
            </h2>
            <p>
              Fill up personal information and <br /> start journey with us
            </p>
            <Link to="/auth#signup">
            <StyledButton value="SIGN UP" className="mt-4" varient="white-lined"/>
            </Link>
        </div>
      </div>
    </div>
  )
}

export default Auth