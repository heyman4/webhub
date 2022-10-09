import React,{useState, useEffect, useContext} from 'react'
import '../../styles/home.css'
import Pagination from '../screens/pagination'

import { UserContext } from '../../App'
import { useNavigate } from 'react-router-dom'
import M from 'materialize-css'

import { Link } from 'react-router-dom'

import Navbar from "./navbar"
import {GoLocation} from "react-icons/go"
import {AiOutlineLinkedin} from "react-icons/ai"
import {CgMail} from "react-icons/cg"
<link rel="stylesheet" href="https://unicons.iconscout.com/release/v2.1.6/css/unicons.css"></link>

const Home = ()=>{
    const {state, dispatch} = useContext(UserContext)
    const navigate = useNavigate()
    
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
const [currentPage, setCurrentPage] = useState(1);
const [postPerPage] = useState(2)
    

    useEffect(()=>{
        setLoading(true);
        fetch('/allpost', {
            headers:{
                "Authorization":"Bearer " + localStorage.getItem("jwt")
            }
        }).then(res=> res.json())
        .then(result =>{
            console.log(result)
            setData(result.posts)
        })
        setLoading(true);
    }, []);

    const indexOfLastpost = currentPage * postPerPage;
    const indexOfFirstpost = indexOfLastpost - postPerPage;
    const currentData = data.slice(indexOfFirstpost, indexOfLastpost)
    const paginate = (pageNumber) => {
        if(pageNumber > 0 && pageNumber <= Math.ceil(data.length / postPerPage)){
          setCurrentPage(pageNumber);
        }
        else{
          if(pageNumber < 1){
            setCurrentPage(1);
          }
          else{
            setCurrentPage(Math.ceil(data.length / postPerPage))
          }
          
        }
        
        }
 

    return(
        <>
            <div>
                <Navbar />
                <div className="homepage">
                <div></div>
                {/* <h1>Home</h1> */}
                <div className="homemain">
                    <h3>All available links</h3>
                    
                        {
                            currentData.map(item =>{
                                // console.log(item)
                                return(
                                    <>  
                                        <div className="linkcontaint">
                                        <a href={item.link} target="_blank" className="mainlink" rel="noreferrer noopener">{item.title}</a><br></br>
                                        <span><a href={item.link} target="_balnk" className="link" rel="noreferrer noopener">{item.link}</a></span><br></br>
                                        <span className="date">Release Date : {item.date}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <span className="contributedby">Contributed By : {item.contributor}</span><br></br>
                                        <span>{item.description}</span>
                                        
                                        </div>
                                       
                                    </>
                                )
                            })
                        }    
                        <Pagination postsPerPage={postPerPage} totalposts={data.length} paginate={paginate} currentPage={currentPage} />
                </div><div>
                </div>
                </div>

                <footer className="footerh">
                    
                    <div className="left">
                        
                        <h3>About</h3>
                        <p>Web development refers to the building, creating, and maintaining of websites. It includes aspects such as web design, web publishing, web programming, and database management. It is the creation of an application that works over the internet i.e. websites. The word Web Development is made up of two words, that is:</p>
                        <p>&copy;webhub</p>
                    </div>
                    <div className="right">
                        <h3>Contact Us</h3>
                        <div>
                            <span>Webhub Services</span><br></br>
                            <span>Rajlabdhi Heritage</span><br></br>
                            <span>Koba-Ambapur approach</span><br></br>
                            <span>Gandinagar</span>&nbsp;&nbsp;
                            <span><a href="https://goo.gl/maps/BnyE8YSgdGStrzUr8" target="_blank" className="footerlink" rel="noreferrer noopener"><GoLocation /></a></span>&nbsp;&nbsp;&nbsp;<br />
                            <span><a href="https://www.linkedin.com" className="footerlink" rel="noreferrer noopener" target="_blank"><AiOutlineLinkedin /></a></span>&nbsp;&nbsp;&nbsp;
                            <span><a href="https://www.linkedin.com" className="footerlink" rel="noreferrer noopener" target="_blank"><CgMail /></a></span>&nbsp;&nbsp;&nbsp;
                        </div>
                    </div>
                </footer>

            </div>
        </>
    )
}

export default Home