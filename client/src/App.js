import React, {useEffect, useContext, createContext, useReducer} from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'

import Login from './components/screens/login.js';
import Signup from './components/screens/signup.js';
import VerifyOTP from './components/screens/verifyOtp.js';
import ForgetPassword from './components/screens/forgetPassword.js';
import VerifyForgetPasswordOTP from './components/screens/verifyForget.js';
import ChangePassword from './components/screens/changePassword.js';
import Home from './components/screens/home.js';
import Profile from './components/screens/profile';
import AddSite from './components/screens/addsite';
import ProfilePic from './components/screens/profilePic';
// import Pagination from './components/screens/pagination';

import {reducer, initialState} from './reducers/userReducer'
export const UserContext = createContext()

const Routing = ()=>{

  const navigate = useNavigate()
  const {state, dispatch} = useContext(UserContext)

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER", payload: user})
      // console.log(user)
      // navigate('/home')
    }
    else{
      navigate('/')
    }
  }, []);

  return(
    <Routes>
        <Route exact path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/verify' element={<VerifyOTP />}/>
        <Route path='/forgettenPassword' element={<ForgetPassword />}/>
        <Route path='/verifyForgettenPassword' element={<VerifyForgetPasswordOTP />}/>
        <Route path='/changePassword' element={<ChangePassword />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/addContribution' element={<AddSite />}/>
        <Route path='/profile/profilePic' element={<ProfilePic />} />
    </Routes>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{state, dispatch}}>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
