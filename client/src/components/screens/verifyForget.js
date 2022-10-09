import React, {useState} from 'react'

import { MDBContainer, MDBCol, MDBRow, MDBCard, MDBCardBody, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import '../../styles/login.css'

import { useNavigate, Link } from 'react-router-dom';
import M from 'materialize-css'

const   ForgetPasswordOtp = () => {
    const navigate = useNavigate()
    const [otp, setOtp] = useState("")
    
    const email = localStorage.getItem("email");

    const verifyForgetOTP = () =>{
        fetch("/verifyForgetPasswordOtp",{
            method : "post",
            headers : {
                "Content-Type" : "application/json",
            },
            body:JSON.stringify({
                otp,
                email
            })

        })
        .then(res => res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error, classes:"#c62828 red darken-3"})
                localStorage.removeItem("email")
                navigate('/signup')
            }
            else{
                M.toast({html: data.message, classes:"#43a047 green darken-1"})
                navigate('/changePassword')
            }
        }).catch(err=>{
            console.log(err)
        })
        
    }


    return (
        <>
            <div className="login">
            <div></div>
            <div>
            <MDBContainer fluid className="p-3 my-5">

                <MDBRow>

                    <MDBCol col='10' md='6'>
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
                    </MDBCol>

                    <MDBCol col='4' md='6'>

                        <MDBContainer className="p-3 my-5 d-flex flex-column ">
                            <div className='mask gradient-custom-3'></div>
                            <MDBCard className='m-0' >
                            <MDBCardBody className='px-4'>
                                <h2 className="text-uppercase text-center mb-4">OTP Verification</h2>
                                <form method='post'>
                                <MDBInput wrapperClass='mb-3' label='Enter Otp' type="number" maxLength={6} minLength={6} name='otp' id='form1' value={otp} onChange={(e)=>setOtp(e.target.value)} required/>
                                {/* <MDBInput wrapperClass='mb-2' label='Password' name='password' id='form2' type='password' value={password} onChange={(e)=>setPassword(e.target.value)} required/> */}

                                {/* <div className="d-flex justify-content-between mx-2 mb-3">
                                <div></div>
                                <a href="!#">Forgot password?</a>
                                </div> */}

                                <input className="input_ele" type="submit" value="Submit Otp" onClick={()=>verifyForgetOTP()} />
                                </form>
                                {/* <MDBBtn className="mb-4">Sign in</MDBBtn> */}

                                <div className="text-center">
                                <div className="signin register">
                                    <span>Have already an account ? </span>
                                    {/* <a role="button" href="/signup" id="signup">
                                        Sign up
                                    </a> */}
                                    <Link to="/"> Register Here</Link>
                                </div>
                                
                                </div>

                            </MDBCardBody>
                            </MDBCard>
                        </MDBContainer>

                    </MDBCol>

                </MDBRow>

            </MDBContainer>
            </div>
            <div></div>
        </div>
        </>
    )
}

export default ForgetPasswordOtp