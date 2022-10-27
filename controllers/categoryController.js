const Category = require('../models/Category');


const getCategories = async (req, res, next) => {
    const filter = {}; //filters to return only selected fields
    const options = {}; //sorting/pagination
    
    if(Object.keys(req.query).length){
        //query parameter
        const {
            category,
            gender,
            limit,
            sortByCategory
        } = req.query

        if(category) filter.category = true;
        if(gender) filter.gender =true;
        if(limit) options.limit = limit;
        if(sortByCategory) options.sort = {
            price: sortByCategory === 'asc'?1:-1
        }
    }
    try{
        const categories = await Category.find({},filter, options);

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(categories)
    } catch (err) {
        throw new Error(`ERROR GETTING CATEGORIES: ${err.message}`); 
    }
}; 

const postCategory = async (req, res, next) => {
    try {
        const category = await Category.create(req.body)

        res
        .status(201)
        .setHeader('Content-Type', 'applicaton/json')
        .json(category)
    } catch (err) {
        throw new Error(`ERROR ADDING CATEGORY: ${err.message}`)
    }
};

const deleteCategories = async (req, res, next) => {
    try {
        await Category.deleteMany();

        res
        .status(200)
        .setHeader('Content-Type', 'applicaton/json')
        .json({ success: true, msg: 'succesfully deleted all categories!' })
    } catch (err) {
        throw new Error(`ERROR DELETING CATEGORIES: ${err.message}`)
    }
};

const getCategory = async (req, res, next) => {
    try {
        //payload
        const category = await Category.findById(req.params.categoryId)

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(category)
    } catch (err) {
        throw new Error(`ERROR GETTING CATEGORY ${req.params.categoryId}: ${err.message}`)
    }
    
}

const updateCategory = async (req, res, next) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.categoryId, {
            $set: req.body
        }, {new: true }); 

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(category)
    } catch (err) {
        throw new Error(`ERROR UPDATING CATEGORY ${req.params.categoryId}: ${err.message}`)
    }
}; 

const deleteCategory = async (req, res, next) => {
    try {
        await Category.findByIdAndDelete(req.params.categoryId);

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ success: true, msg: `Category with id ${req.params.categoryId} has been deleted!` })
    } catch (err) {
        throw new Error(`ERROR DELETING CATEGORY ${req.params.categoryId}: ${err.message}`)
    }
}; 

module.exports = {
    getCategories, 
    postCategory, 
    deleteCategory, 
    getCategory, 
    updateCategory, 
    deleteCategories
}; 