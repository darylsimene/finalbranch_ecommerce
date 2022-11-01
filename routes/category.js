const express = require('express'); 
const router = express.Router(); 

const { 
      getCategories, 
      postCategory, 
      deleteCategories, 
      getCategory, 
      updateCategory, 
      deleteCategory
} = require('../controllers/categoryController'); 


const reqReceivedLogger = require('../middlewares/reqReceivedLogger');
const {categoryValidator} = require('../middlewares/utils/validator');
const protectedRoute = require('../middlewares/auth')

router.route('/')
      .get(reqReceivedLogger, getCategories)
      .post(reqReceivedLogger, protectedRoute, categoryValidator, postCategory)
      .delete(reqReceivedLogger, protectedRoute, deleteCategories)

router.route('/:categoryId')
      .get(reqReceivedLogger, getCategory)
      .put(reqReceivedLogger, protectedRoute, updateCategory)
      .delete(reqReceivedLogger, protectedRoute, deleteCategory)

module.exports = router;