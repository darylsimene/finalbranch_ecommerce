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


const reqRecievedLogger = require('../middlewares/reqReceivedLogger');
const {categoryValidator} = require('../middlewares/utils/validator');
const protectedRoute = require('../middlewares/auth')

router.route('/')
      .get(reqRecievedLogger, getCategories)
      .post(reqRecievedLogger, protectedRoute, categoryValidator, postCategory)
      .delete(reqRecievedLogger, protectedRoute, deleteCategories)

router.route('/:categoryId')
      .get(reqRecievedLogger, getCategory)
      .put(reqRecievedLogger, protectedRoute, updateCategory)
      .delete(reqRecievedLogger, protectedRoute, deleteCategory)

module.exports = router;