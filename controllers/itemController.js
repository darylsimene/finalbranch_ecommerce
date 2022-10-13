// For ‘/’ endpoint:

// getItem
const getItems = (req, res, next) => {
    res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({
            success: true,
            msg: 'Show me all ITEMS'
        })
}

// postItem
const postItems = (req, res, next) => {
    res
        .status(201)
        .setHeader('Content-Type', 'application/json')
        .json({
            success: true,
            msg: 'Create new ITEM'
        })
}

// deleteItems
const deleteItems = (req, res, next) => {
    res
        .status(201)
        .setHeader('Content-Type', 'application/json')
        .json({
            success: true,
            msg: 'Delete all ITEMS.'
        })
}


// For ‘/:itemId’ endpoint:

// getItem
const getItem = (req, res, next) => {
    res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({
            success: true,
            msg: `Show me one ITEM with id: ${req.params.itemID}`
        })
}

// updateItem
const updateItem = (req, res, next) => {
    res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({
            success: true,
            msg: `Update ITEMS with id: ${req.params.itemID}`
        })
}

// deleteItem
const deleteItem = (req, res, next) => {
    res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({
            success: true,
            msg: `Delete ITEM with id: ${req.params.itemID}`
        })
}


module.exports = {
    getItems,
    postItems,
    deleteItems,
    getItem,
    updateItem,
    deleteItem
}