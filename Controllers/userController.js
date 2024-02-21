const express = require('express');
const UserModel = require('../models/userModel');
const expressAsyncHandler = require('express-async-handler');
const generateToken = require('../Config/generateToken');

const loginController = expressAsyncHandler (async(req, res)=>{
    const {name, password} = req.body;
    const user = UserModel.findOne({name});

    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    }else{
        throw new Error ('Invalid Username or Password');
    }
});

const registerController = expressAsyncHandler (async (req, res) =>{
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        res.status(400).json({ message: 'All Necessary Input Fields have not been Filled' });
        return;
    }

    const userExist = await UserModel.findOne({email});
    if(userExist){
        res.status(400).json({ message: 'User Already Exists' });
        return;
    }

    const userNameExist = await UserModel.findOne({name});
    if(userNameExist){
        res.status(400).json({ message: 'Username Already Exists' });
        return;    
    }
    const user = UserModel.create({name, email, password});
    // console.log(user);
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    }else{
        res.status(400);
        throw new Error ('Registration Error')
    }
});


module.exports = {loginController, registerController};