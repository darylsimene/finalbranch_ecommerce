const Item = require('../models/Item')

const getItems = async (req, res, next) => {
    // if(Object.keys(req.query).length){
    //     //query parameter

    //     const {
    //         gender,
    //         price,
    //         isClearance,
    //         item,
    //         colors,
    //         sizes
    //     } = req.query

    //     const filter = []

    //     if(gender) filter.push(gender);
    //     if(price) filter.push(price);
    //     if(isClearance) filter.push(isClearance);
    //     if(item) filter.push(item);
    //     if(colors) filter.push(colors);
    //     if(sizes) filter.push(sizes);

    //     for (let i = 0; i < filter.length; i++){
    //         console.log(`Searching item(s) by: ${filter[i]}`)
    //     }
    // }

    try{
        const result = await Item.find();

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(result)
    } catch (err) {
        throw new Error(`Error retrieving items: ${err.message}`); 
    }

    
}

// postItem
const postItems = async (req, res, next) => {
    try{
        const result = await Item.create(req.body)

        res
        .status(201)
        .setHeader('Content-Type', 'applicaton/json')
        .json(result)

    } catch (err){
        throw new Error(`Error posting a new item: ${err.message}`)

    }
}

// deleteItems
const deleteItems = async (req, res, next) => {
    try{
        await Item.deleteMany();

        res
        .status(200)
        .setHeader('Content-Type', 'applicaton/json')
        .json({ success: true, msg: 'succesfully deleted all items!' })

    } catch(err){
        throw new Error(`Error deleting all items: ${err.message}`)
    }
}

const getItem = async(req, res, next) => {
    try{
        const result = await Item.findById(req.params.itemId)

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(result)

    } catch (err){
        throw new Error(`Error getting item id of ${req.params.itemId}: ${err.message}`)
    }
}

const updateItem = async (req, res, next) => {
    try {
        const result = await Item.findByIdAndUpdate(req.params.itemId, {
            $set: req.body
        }, {new: true }); 

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(result)
    } catch (err) {
        throw new Error(`Error updating item with id of ${req.params.itemId}: ${err.message}`)
    }
}

const deleteItem = async (req, res, next) => {
    try {
        await Item.findByIdAndDelete(req.params.itemId);

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ success: true, msg: `item with id ${req.params.itemId} has been deleted!` })
    } catch (err) {
        throw new Error(`Erorr deleting item with id of ${req.params.itemId}: ${err.message}`)
    }
}

module.exports = {
    getItems,
    postItems,
    deleteItems,
    getItem,
    updateItem,
    deleteItem
}