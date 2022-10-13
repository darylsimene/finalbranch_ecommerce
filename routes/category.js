const express = require('express');
const router = express.Router();


const { getCategories, postCategory,
    deleteCategories,
    getCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categoryController');

router.route('/')
    .get(getCategories)
    .post(postCategory)
    .delete(deleteCategories)

router.route('/:categoryID')
    .get(getCategory)
    .put(updateCategory)
    .delete(deleteCategory)

module.exports = router;