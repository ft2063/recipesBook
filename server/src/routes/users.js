import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {userModel} from '../models/Users.js'

const router = express.Router();

router.post("/register", async(req, res)=> {
    const{username, password} = req.body;
    const user = await userModel.findOne({username});
    if (user){
        return res.json({message: "user already exists"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({username, password: hashedPassword});
    await newUser.save();

    res.json({message: "user registered successfully!"});
});
router.post("/login", async (req, res) =>{
    const{username, password} = req.body;
    const user = await userModel.findOne({ username });
    if (!user){
        return res.json({message:"user does not exist!"});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid){
        return res.json({message:"username or password not correct!"});
    }
    const token = jwt.sign({id: user._id}, "secret");
    res.json({token, userID: user._id});
});



export {router as userRouter};
