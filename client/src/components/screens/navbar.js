import {Link,useMatch,useResolvedPath} from "react-router-dom"
// import { Navbar, Nav, form } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useContext} from 'react';
import {FiHome} from "react-icons/fi";
import {CgProfile} from "react-icons/cg"
import {MdLogout} from "react-icons/md"
// import './Navbar.css'

import { UserContext } from "../../App";

import M from 'materialize-css'
import { useNavigate } from 'react-router-dom';
import SearchBar from "./SearchBar";

export default function Navbar1() {
    // const path = window.location.pathname
    const {state, dispatch} = useContext(UserContext)

    const navigate = useNavigate()
    
    const logoutUser = ()=>{
        localStorage.clear()
        dispatch({type:"CLEAR"})
        M.toast({html: "Successfully logout !!", classes:"#43a047 green darken-1"})
        navigate('/')
    }

    return(<div>
         <nav className="nav">
        <div>
            {/* <img src="photography(1).png" alt="profile photo" className="profileimg"></img> */}
            <Link to="/home" className="site-title">Webhub</Link>
        </div>

        <div className="searchbar1">
           <SearchBar placeholder="enter..."  />
        </div>
        <div>
        <ul>

            <CustomLLink to="/home"><FiHome /></CustomLLink>
            
            <CustomLLink to="/profile" className = "icon1"><CgProfile /></CustomLLink>
            {/* <CustomLLink to="/signup" className onClick={()=>logoutUser()}></CustomLLink> */}
            <button onClick={()=>logoutUser()}><MdLogout /></button>
        </ul>
        </div>
    </nav>
    </div>
    )
}


function CustomLLink({to,children, ...props}){
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path : resolvedPath.pathname, end :true})
    return(
        <li className={isActive ? "active" :""}>
            <Link to ={to} {...props}>
                {children}
            </Link>
        </li>    
    )
}