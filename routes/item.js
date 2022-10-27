const express = require('express');
const router = express.Router();
const reqReceivedLogger = require('../middlewares/reqReceivedLogger')

const { getItems,
    postItems,
    deleteItems,
    getItem,
    updateItem,
    deleteItem,
    getItemRatings,
    postItemRating,
    deleteItemRatings,
    getItemRating,
    updateItemRating,
    deleteItemRating,
    postItemImage
} = require('../controllers/itemController');

const reqRecievedLogger = require('../middlewares/reqReceivedLogger');
const {itemValidator} = require('../middlewares/utils/validator');
const protectedRoute = require('../middlewares/auth')
router
.route('/')
.get(reqRecievedLogger, getItems)
.post(reqRecievedLogger,protectedRoute, itemValidator, postItems)
.delete(reqRecievedLogger,protectedRoute,  deleteItems)

router
.route('/:itemId')
.get(reqRecievedLogger, getItem)
.put(reqRecievedLogger, protectedRoute, updateItem)
.delete(reqRecievedLogger, protectedRoute, deleteItem)

router
.route('/:itemId/ratings')
.get(reqRecievedLogger, getItemRatings)
.post(reqRecievedLogger, protectedRoute, postItemRating)
.delete(reqRecievedLogger,protectedRoute, deleteItemRatings)

router
.route('/:itemId/ratings/:ratingId')
.get(reqRecievedLogger, getItemRating)
.put(reqRecievedLogger, protectedRoute, updateItemRating)
.delete(reqReceivedLogger, protectedRoute, deleteItemRating)

router
.route('/:itemId/image')
.post(reqRecievedLogger, protectedRoute, postItemImage)


module.exports = router;