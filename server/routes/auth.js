const express = require("express");
const app = express();
const router = express.Router();

const mongoose = require('mongoose');
require('../models/user.js');
const user = mongoose.model("Users");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const requireLogin = require('../middleware/requirelogin');

const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN)

router.post('/signup', (req, res)=>{
    const {name, username, email, password} = req.body;
    // console.log(name);
    if(!name || !username || !email || !password){
        return res.status(422).json({error:"Invalid entry !"});
    }

    user.findOne({email : email})
    .then((saved)=>{
        
        if(!saved){
            // console.log(email);

            client.verify.v2.services(process.env.SERVICE_ID)
                .verifications
                .create({to: email, channel: 'email'})
                .then(verification => 
                    {
                        console.log(verification.sid)
                        console.log("Verification email sent");
                        res.status(200).json({message:"Verfication send"});
                    
                    });
            
        }
        else{
            console.log("error occured");
            res.redirect('/')
        }
    })

})

router.post('/verify', async (req, res)=>{
    const {otp, email, name, username, password} = await req.body;
    
    console.log(otp);
    console.log(name);
    console.log(username);
    console.log(email);
    console.log(password);

    // if(!otp || !name || !username || !email || !password){
    //     return res.status(422).json({error:"Invalid entry !"});
    // }
    
    await user.findOne({email : email, username : username})
    .then((savedUser)=>{
        if(savedUser){
            // res.status(201).redirect("/");
            return res.status(409).json({error:"User already exist !"});

        }

        try{

            client
                .verify
                .services(process.env.SERVICE_ID)
                .verificationChecks
                .create({
                    to: email,
                    code: otp
                })
                .then(data => {
                    console.log(data)
                    if (data.status === "approved") {
                        
                        bcrypt.hash(password, 12)
                        .then(hashedpassword =>{
                            const User = new user({
                                name,
                                username,
                                email : email,
                                password : hashedpassword
                            })
                    
                            User.save()
                            .then(User=>{
                                res.status(200).json({message:"User registered successfully !"});
                                
                            })
                            .catch(err=>{
                                console.log(err);
                            })
                        })
                        .catch(err => {
                            console.log(err);
                        })
                        
                    }
                    else{
                        res.status(200).json({error:"Otp not verified successfully !"});
                    }
                })

        }
        catch (error) {
            res.status(400).send(error);
        }
        
    })
    .catch(err=>{
        console.log(err);
    })

})


router.post('/signin', (req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(422).json({error:"Please add phone or password !"});
    }

    user.findOne({email : email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"Please signup !!"});
        }

        bcrypt.compare(password, savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // res.status(200).json({message:"Successfully signedin !!"})
                // res.redirect('/home');
                const token = jwt.sign({_id:savedUser._id}, process.env.JWT_SECRET);
                const {_id, name, username, pic} = savedUser
                res.json({token, user : {_id, name, username, pic}});
            }
            else{
                return res.status(422).json({error:"Invalid Cerenditals !!"});
            }
        })
        .catch(err=>{
            console.log(err);
        })


    })



})


router.post('/forgettenPassword', (req, res)=>{
    const {email} = req.body;
    if(!email){
        return res.status(422).json({error:"Invalid entry !"});
    }
    
    user.findOne({email : email})
    .then((savedUser)=>{
        if(savedUser){

            client.verify.v2.services(process.env.SERVICE_ID)
                .verifications
                .create({to: email, channel: 'email'})
                .then(data => {
                    console.log(data);
                    res.status(200).redirect("/verifyForgettenPassword");
                    // console.log(localStorage.setItem("phone", phone));
                })
                .catch(err => {
                    console.log(err)
                }) 


                
                // res.status(200).json({message:"Otp send !"});
        }
        else{
            return res.status(409).json({error:"Please register !!"});
        }

    })
    .catch(err=>{
        console.log(err);
    })


})

router.post('/verifyForgettenPassword', async (req, res)=>{
    const {otp , email} = await req.body;

    console.log(email);

    client
                .verify
                .services(process.env.SERVICE_ID)
                .verificationChecks
                .create({
                    to: email,
                    code: otp
                })
                .then(data => {
                    if (data.status === "approved") {
                        res.status(200).redirect("/changePassword");
                        // res.status(200).json({message:"Otp verified successfully !"});
                        // res.redirect('/')
                    }
                    else{
                        res.status(200).json({error:"Otp not verified successfully !"});
                    }
                })


})


router.post('/changePassword', (req, res)=>{
    const {password, email} = req.body;
    if(!password){
        return res.status(422).json({error:"Password not provided !"});
    }

    user.findOne({email : email})
    .then((savedUser)=>{
        if(savedUser){
            try{

                bcrypt.hash(password, 12)
                .then(hashedpassword =>{

                    user.updateOne({ email : email }, { password: hashedpassword }, function(
                        err,
                        result
                      ) {
                        if (err) {
                            return res.status(200).send(err);
                        } else {
                            res.status(200).json({message:"Password changed successfully !"});
                        }
                      });


                })
            }
            catch (error) {
                res.status(400).send(error);
            }

        }

    })
    .catch(err=>{
        console.log(err);
    })


})

module.exports = router;