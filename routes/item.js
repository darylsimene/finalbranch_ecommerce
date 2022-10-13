const express = require('express');
const router = express.Router();


const { getItems,
    postItems,
    deleteItems,
    getItem,
    updateItem,
    deleteItem
} = require('../controllers/itemController');

router.route('/')
    .get(getItems)
    .post(postItems)
    .delete(deleteItems)

router.route('/:itemID')
    .get(getItem)
    .put(updateItem)
    .delete(deleteItem)

module.exports = router;