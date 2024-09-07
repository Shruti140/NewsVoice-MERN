import express from 'express';
const router=express.Router();
import User from '../models/User.js';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';

router.put("/:id",async (req,res)=>{
    try{
        let exist = await User.findOne(req.body);
        if(exist) {
            res.status(200).json('user already exists');
            return;
        }
        const newUser = new User(req.body);
        await newUser.save();
        response.status(200).json(newUser);

        // if(req.body.password){
        //     const salt=await bcrypt.genSalt(10)
        //     req.body.password=await bcrypt.hashSync(req.body.password,salt)
        // }
        // const updatedUser=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        // res.status(200).json(updatedUser)

    }
    catch(err){
        res.status(500).json(err)
    }
})


//DELETE
router.delete("/:id",async (req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        await Post.deleteMany({userId:req.params.id})
        await Comment.deleteMany({userId:req.params.id})
        res.status(200).json("User has been deleted!")

    }
    catch(err){
        res.status(500).json(err)
    }
})


//GET USER
router.get("/:id",async (req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        res.status(200).json(user)
    }
    catch(err){
        res.status(500).json(err)
    }
})


export default router;