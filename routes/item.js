const express = require('express');
const router = express.Router();
const reqReceivedLogger = require('../middlewares/reqReceivedLogger')

const { getItems,
    postItems,
    deleteItems,
    getItem,
    updateItem,
    deleteItem
} = require('../controllers/itemController');

const reqRecievedLogger = require('../middlewares/reqReceivedLogger');
const {itemValidator} = require('../middlewares/utils/validator');

router.route('/')
    .get(reqRecievedLogger, getItems)
    .post(reqRecievedLogger, itemValidator, postItems)
    .delete(reqRecievedLogger, deleteItems)

router.route('/:itemId')
    .get(reqRecievedLogger, getItem)
    .put(reqRecievedLogger, updateItem)
    .delete(reqRecievedLogger, deleteItem)

module.exports = router;