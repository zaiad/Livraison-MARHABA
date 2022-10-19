const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')
const { red } = require('colors')

// @desc Register new user
// @route POST /api/users
// @access   Public

const registerUser = async (req, res) =>{
    // const {body} = req
    // User.create({
    //     ...body
    // })
    //     .then(user=>{
    //         res.json(user)
    //     })
    //     .catch(()=>{
    //         res.send('err')
    //     })

    
    const {name, email, password} = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if user exists
    const userExists = await User.findOne({email})

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // // //  Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
        
        // create user
        const user = User.create({
            name,
            email,
            password: hashedPassword
        })

    //     try{
    //         const saveuser = User.save()
    //         res.send(saveuser)
    //     }
    //     catch(err){
    //         res.status(400).send(err)
    //     }

        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email
            })
            
        } 
        else{
            res.status(400)
            throw new Error('Invalid user data')
        }

        // res.json({message: 'user register'})
}

// @desc authenticate a user
// @route POST /api/users/login
// @access   Public

const loginUser = asyncHandler(async(req, res) =>{
    res.json({message: 'Login User'})
})

// @desc Get user data
// @route Get /api/users/me
// @access   Public

const getMe = asyncHandler(async(req, res) =>{
    res.json({message: 'User data display'})
})

module.exports = {
    registerUser,
    loginUser,
    getMe
}