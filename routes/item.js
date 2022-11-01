const express = require('express');
const router = express.Router();

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

const reqReceivedLogger = require('../middlewares/reqReceivedLogger');
const {itemValidator} = require('../middlewares/utils/validator');
const protectedRoute = require('../middlewares/auth')
router
.route('/')
.get(reqReceivedLogger, getItems)
.post(reqReceivedLogger,protectedRoute, itemValidator, postItems)
.delete(reqReceivedLogger,protectedRoute,  deleteItems)

router
.route('/:itemId')
.get(reqReceivedLogger, getItem)
.put(reqReceivedLogger, protectedRoute, updateItem)
.delete(reqReceivedLogger, protectedRoute, deleteItem)

router
.route('/:itemId/ratings')
.get(reqReceivedLogger, getItemRatings)
.post(reqReceivedLogger, protectedRoute, postItemRating)
.delete(reqReceivedLogger,protectedRoute, deleteItemRatings)

router
.route('/:itemId/ratings/:ratingId')
.get(reqReceivedLogger, getItemRating)
.put(reqReceivedLogger, protectedRoute, updateItemRating)
.delete(reqReceivedLogger, protectedRoute, deleteItemRating)

router
.route('/:itemId/image')
.post(reqReceivedLogger, protectedRoute, postItemImage)


module.exports = router;