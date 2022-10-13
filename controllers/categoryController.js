// For '/' endpoint

const getCategories = (req, res, next) => {
    res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({
            success: true,
            msg: 'Show me all categories'
        })
}

const postCategory = (req, res, next) => {
    res
        .status(201)
        .setHeader('Content-Type', 'application/json')
        .json({
            success: true,
            msg: 'Create new Category!'
        })
}

const deleteCategories = (req, res, next) => {
    res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({
            success: true,
            msg: 'DELETE ALL CATEGORY!'
        })
}

//for categoryID endpoint
const getCategory = (req, res, next) => {
    res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({
            success: true,
            msg: `show me one category with id: ${req.params.categoryID}`
        })
}
const updateCategory = (req, res, next) => {
    res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({
            success: true,
            msg: `Update category with id: ${req.params.categoryID}`
        })
}
const deleteCategory = (req, res, next) => {
    res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({
            success: true,
            msg: `Delete category with id: ${req.params.categoryID}`
        })
}
module.exports = {
    getCategories,
    postCategory,
    deleteCategories,
    getCategory,
    updateCategory,
    deleteCategory
}