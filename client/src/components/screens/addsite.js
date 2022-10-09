import React, {useEffect, useState, useContext} from "react";
import '../../styles/home.css'
import { UserContext } from "../../App";

import { useNavigate, Link } from 'react-router-dom'
import Navbar from "./navbar"

import M from 'materialize-css'

const AddSite = ()=>{

    const navigate = useNavigate()
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [contributor, setContributor] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");

    const postDetails = ()=>{
        

        fetch("/addContribution",{
            method : "post",
            headers : {
                "Authorization" : "Bearer " + localStorage.getItem("jwt"),
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                title, 
                link,
                contributor,
                date,
                description
            })

        })
        .then(res => res.json())
        .then(data=>{
            if(data.error){
                return M.toast({html: data.error, classes:"#c62828 red darken-3"})
            }
            else{
                M.toast({html: "Created post successfully !!!", classes:"#43a047 green darken-1"})
                navigate('/home')
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        <>
            <Navbar />
            <div className="adduppage">
                <div></div>
            <div className="addsite1">
                <form className="addupform" method="post">
                
                    <div>
                        <label className="label1">Title for site :</label><br></br>
                        <textarea name="title" cols="40" rows="1" className="input1" value={title} onChange={(e)=>setTitle(e.target.value)} required></textarea>
                    </div>
                    <div>
                        <label className="label1">Link to site :</label><br></br>
                        <textarea name="link" cols="40" rows="1" className="input1" value={link} onChange={(e) => setLink(e.target.value)} required></textarea>
                    </div>
                    <div>
                        <label className="label1">Release Date :</label><br></br>
                        <input type="date" className="input1" name="releasedate" value={date} onChange={(e) => setDate(e.target.value)}></input>
                    </div>
                    <div>
                        <label className="label1">Contributors :</label><br></br>
                        <textarea name="contributors" cols="40" rows="1" className="input1" value={contributor} onChange={(e) => setContributor(e.target.value)}></textarea>
                    </div>
                    {/* <div>
                        <label className="label1">Profile Link </label><span>(github,linkedin) :</span><br></br>
                        <textarea name="link" cols="40" rows="1" className="input1"></textarea>
                    </div> */}
                    <div>
                        <label className="label1">Short Description :</label><span>(within 20 to 25 words)</span><br></br>
                        <textarea name="description" cols="40" rows="3" className="input1" maxLength="400" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                    </div>
                    <br></br>
                    <div id="submit">
                            <input type="submit" value="Submit" id="submit1" onClick={()=>postDetails()}></input>
                    </div>
                    
                </form>
            </div>
            <div></div>
            </div>
        
        </>
    );

};

export default AddSite;