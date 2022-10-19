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

router.route('/')
      .get(reqRecievedLogger, getCategories)
      .post(reqRecievedLogger, categoryValidator, postCategory)
      .delete(reqRecievedLogger, deleteCategories)

router.route('/:categoryId')
      .get(reqRecievedLogger, getCategory)
      .put(reqRecievedLogger, updateCategory)
      .delete(reqRecievedLogger, deleteCategory)

module.exports = router;