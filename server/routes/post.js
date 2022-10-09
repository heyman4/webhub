const express = require("express");
const app = express();
const router = express.Router();

const mongoose = require('mongoose');

const requirelogin = require('../middleware/requirelogin.js')
const Post = mongoose.model('Post')

router.get('/allpost', requirelogin, (req, res)=>{
    Post.find({postedBy: {$nin:req.users}})
    .populate("postedBy", "_id name username pic")
    .then(posts =>{
        res.send({posts});
    })
    .catch(err =>{
        console.log(err);
    })
})


router.post('/addContribution', requirelogin, (req, res)=>{
    const {title, link, contributor, date, description} = req.body
    // console.log(req.user)
    if(!title || !link || !date){
        return res.status(422).json({error:"Please add all the feilds"})
    }

    req.user.password = undefined
    const post = new Post({
        title : title,
        link : link,
        contributor : contributor,
        date : date,
        description : description,
        postedBy : req.user
    })
    post.save().then(result =>{
        res.send({post : result})
        // res.status(200).redirect('/home');
    })
    .catch(err=>{
        console.log(err);
    })
})

router.get('/mypost', requirelogin, (req, res)=>{
    Post.find({postedBy : req.user._id})
    .populate("postedBy", "_id name username pic" )
    .then(mypost =>{
        res.send({mypost})
    })
    .catch(err =>{
        console.log(err);
    })
})

router.delete('/deletepost/:postID', requirelogin, (req, res)=>{
    Post.findOne({_id : req.params.postID})
    .populate("postedBy", "_id")
    .exec((err, post) =>{
        if(err || !post){
            return res.status(422).json({error: err})
        }
        if(post.postedBy._id.toString() === req.user._id.toString()){
            post.remove()
            .then(result =>{
                res.json(result)
            })
            .catch(err =>{
                console.log(err)
            })
        }
    })
})

module.exports = router