const express = require('express');
const UserModel = require('../models/userModel');
const User = require('../models/userModel');
const expressAsyncHandler = require('express-async-handler');
const loginController = ()=>{
    
}

const registerController = expressAsyncHandler (async (req, res) =>{
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        res.send(400);
        throw Error ('All Necessary Input Feilds have not been Filled');
    }

    const userExist = await UserModel.findOne({email});
    if(userExist){
        throw Error ('User Already Exists');    
    }

    const userNameExist = await UserModel.findOne({name});
    if(userNameExist){
        throw Error ('User Name Already Exists');    
    }

    const user = UserModel.create({name, email, password});

});


module.exports = {loginController, registerController};