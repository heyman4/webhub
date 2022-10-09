import React, {useEffect, useState, useContext} from "react";
import '../../styles/home.css'
import { UserContext } from "../../App";

import { useNavigate, Link } from 'react-router-dom'
import Navbar from "./navbar"

const Profile = ()=>{

    const navigate = useNavigate()
    const path = window.location.pathname

    const {state, dispatch} = useContext(UserContext)

    const [mypost, setMyPost] = useState([])
    const [data, setData] = useState([])

    useEffect(()=>{

        fetch("/mypost",{
            headers : {
                "Authorization" : "Bearer " + localStorage.getItem("jwt")
            },

        })
        .then(res => res.json())
        .then(result =>{
            setMyPost(result.mypost)
            console.log(result)
        })

    }, []);

    const uploadPicRoute = ()=>{
        navigate('/profile/profilePic')
    }

    const uploadContribution = ()=>{
        navigate('/addContribution');
    }

    const deletePost = (postid)=>{

        if(window.confirm("Are you sure to delete this post ??")){
            fetch(`/deletepost/${postid}`, {
                method : "delete",
                headers:{
                    Authorization:"Bearer " + localStorage.getItem("jwt")
                }
            })
            .then(res => res.json())
            .then(result =>{
                console.log(result)
                const newData = mypost.filter(item =>{
                    return item._id !== result._id
                })
                setMyPost(newData)
            })
        } 
       
    }


    return (
        <>
            <div>
                <Navbar />
            <div className="profilepage">
                <div></div>
            <div className="profile">
                <div className="temp">
                    <h3>{state ? state.username : "loading..."}</h3>
                </div>
                <div className="temp">
                    {
                        <div className="profile-image">

                            <img className="profileimg" src={state ? state.pic : "loading..."} id="profile_pic" alt="" onClick={()=> uploadPicRoute()} />

                        </div>
                    }
                    <br></br>
                </div>
                
                <div className="temp">
                    <p>{state ? state.name : "loading..."}</p>
                    <p>{state ? state.email : "loading..."}</p>
                    {/* <p>1234567890</p> */}

                </div>
                
                <div className="contributions">
                    <span id="contribution">Contribution</span><span>({mypost.length})</span>
                    <ul>
                        {
                            mypost.map(item =>{
                                return(
                                    <>
                                        <li><a href={item.link} target="_blank" className="mainlink1">{item.title}</a><span className="date">-{item.date}</span><br></br>
                                        <span>Contributors : {state ? state.name : "loading..." } & {item.contributor}</span></li>
                                        <button onClick={()=> deletePost(item._id)}> del</button>
                                    </>
                                )
                            })
                        }
                        
                    </ul>
                </div>
                
                <div className="addsite2">
                            {/* <Link to="/addContribution" id="addsite3">Add Contribution</Link> */}
                            <button id="addsite3" onClick={()=> uploadContribution()}>Add Contribution</button>
                </div>
                
            
                </div>
            <div></div>
            </div>
            </div>
        
        </>
    );

};

export default Profile;