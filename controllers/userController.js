const User = require('../models/User');

const getUsers = async(req, res, next) => {
    // if(Object.keys(req.query).length){
    //     const { userName, gender} = req.query

    //     const filter = [];

    //     if (userName) filter.push(userName)
    //     if (gender) filter.push(gender)

    //     for (let i = 0; i < filter.length; i++){
    //         console.log(`Search user(s) by: ${filter[i]}`)
    //     }
    // }
    try{
        const result = await User.find(); 

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(result)

    } catch (err){
        throw new Error(`Error retrieving users: ${err.message}`); 
    }
}

const postUser = async(req, res, next) => {
    // res
    // .status(201)
    // .setHeader('Content-Type', 'application/json')
    // .json({ 
    //     success: true, 
    //     msg: `create one with the following fields:
    //     User Name: ${req.body.userName}
    //     First Name: ${req.body.firstName}
    //     Last Name: ${req.body.lastName}
    //     Gender: ${req.body.gender}
    //     Email: ${req.body.email}
    //     Password: ${req.body.password}
    //     Phone Number: ${req.body.phoneNumber}
    //     `
    // })
    try{
        const result = await User.create(req.body)

        res
        .status(201)
        .setHeader('Content-Type', 'applicaton/json')
        .json(result)
    } catch (err){
        throw new Error(`Error posting a new users: ${err.message}`)
    }
}

const deleteUsers = async (req, res, next) => {
    try{
        await User.deleteMany();

        res
        .status(200)
        .setHeader('Content-Type', 'applicaton/json')
        .json({ success: true, msg: 'succesfully deleted all users!' })
    } catch(err){
        throw new Error(`Error deleting all users: ${err.message}`)
    }
}

const getUser = async(req, res, next) => {
    try{
        const result = await User.findById(req.params.userId)

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(result)
    } catch(err){
        throw new Error(`Error getting user id of ${req.params.userId}: ${err.message}`)
    }
}

const updateUser = async (req, res, next) => {
    try{
        const result = await User.findByIdAndUpdate(req.params.userId, {$set: req.body}, {new: true }); 
        
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(result)

    } catch(err){
        throw new Error(`Error updating user with id of ${req.params.userId}: ${err.message}`)
    }
}

const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.userId);

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ success: true, msg: `User with id ${req.params.userId} has been deleted!` })
    } catch (err) {
        throw new Error(`Error deleting user with id of ${req.params.userId}: ${err.message}`)
    }
}

module.exports = {
    getUsers,
    postUser,
    deleteUsers,
    getUser,
    updateUser,
    deleteUser
}