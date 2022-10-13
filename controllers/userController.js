// For ‘/’ endpoint:

// getUsers
const getUsers = (req, res, next) => {
    res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({
            success: true,
            msg: 'Show me all USERS'
        })
}

// postUsers
const postUser = (req, res, next) => {
    res
        .status(201)
        .setHeader('Content-Type', 'application/json')
        .json({
            success: true,
            msg: 'Create new USER'
        })
}

// deleteUsers
const deleteUsers = (req, res, next) => {
    res
        .status(201)
        .setHeader('Content-Type', 'application/json')
        .json({
            success: true,
            msg: 'Delete all USERS.'
        })
}


// For ‘/:itemId’ endpoint:

// getUser
const getUser = (req, res, next) => {
    res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({
            success: true,
            msg: `Show me one USER with id: ${req.params.userID}`
        })
}

// updateItem
const updateUser = (req, res, next) => {
    res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({
            success: true,
            msg: `Update USER with id: ${req.params.userID}`
        })
}

// deleteItem
const deleteUser = (req, res, next) => {
    res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({
            success: true,
            msg: `Delete USER with id: ${req.params.userID}`
        })
}


module.exports = {
    getUsers,
    postUser,
    deleteUsers,
    getUser,
    updateUser,
    deleteUser
}