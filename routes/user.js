const express = require('express');
const router = express.Router();


const { getUsers,
    postUser,
    deleteUsers,
    getUser,
    updateUser,
    deleteUser
} = require('../controllers/userController');

router.route('/')
    .get(getUsers)
    .post(postUser)
    .delete(deleteUsers)

router.route('/:userID')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)

module.exports = router;