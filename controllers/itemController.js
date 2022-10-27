const Item = require('../models/Item')
const path = require('path');


const getItems = async (req, res, next) => {
    const filter = {}; //filters to return only selected fields
    const options = {}; //sorting/pagination
    
    if(Object.keys(req.query).length){
        //query parameter
        const {
            itemName,
            itemDescription,
            gender,
            price,
            isClearance,
            colors,
            sizes,
            sortByPrice,
            limit
        } = req.query

        if(itemName) filter.itemName = true;
        if(itemDescription) filter.itemDescription = true;
        if(gender) filter.gender = true;
        if(price) filter.price = true;
        if(isClearance) filter.isClearance = true;
        if(colors) filter.colors =true;
        if(sizes) filter.sizes =true;
        if(limit) options.limit = limit;
        if(sortByPrice) options.sort = {
            price: sortByPrice === 'asc'?1:-1
        }
    }
    try{
        const items = await Item.find({},filter, options);

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(items)
    } catch (err) {
        throw new Error(`ERROR GETTING ITEMS: ${err.message}`); 
    }
}

const postItems = async (req, res, next) => {
    try{
        const item = await Item.create(req.body)

        res
        .status(201)
        .setHeader('Content-Type', 'applicaton/json')
        .json(item)

    } catch (err){
        throw new Error(`ERROR POSTING ITEM: ${err.message}`)

    }
}

const deleteItems = async (req, res, next) => {
    try{
        await Item.deleteMany();

        res
        .status(200)
        .setHeader('Content-Type', 'applicaton/json')
        .json({ success: true, msg: 'succesfully deleted all items!' })

    } catch(err){
        throw new Error(`ERROR DELETING ITEMS: ${err.message}`)
    }
}

const getItem = async(req, res, next) => {
    try{
        const item = await Item.findById(req.params.itemId)

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(item)

    } catch (err){
        throw new Error(`ERROR GETTING ITEMS ${req.params.itemId}: ${err.message}`)
    }
}

const updateItem = async (req, res, next) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.itemId, {
            $set: req.body
        }, {new: true }); 

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(item)
    } catch (err) {
        throw new Error(`EERROR UPDATING ITEMS ${req.params.itemId}: ${err.message}`)
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
        throw new Error(`ERROR DELETING ITEMS ${req.params.itemId}: ${err.message}`)
    }
}









//! --------------------------------------------------------ITEM RATINGS
// FOR ("/") ENDPOINTS ------------------------------------------------
const getItemRatings = async(req, res, next)=>{
    try{
        const items = await Item.findById(req.params.itemId);
        const ratings = items.ratings;

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(ratings)

    } catch(err){
        throw new Error(`ERROR GETTING RATINGS IN THE ITEM!`)
    }
}

const postItemRating = async(req, res, next)=>{
    try{
        const item = await Item.findById(req.params.itemId);
        item.ratings.push(req.body);

        const results = await item.save(); //saving the new item with the new rating

        res
        .status(201)
        .setHeader('Content-Type', 'application/json')
        .json(results)
    } catch(err){
        throw new Error(`ERROR POSTING RATING IN THE ITEM!`)
    }
}

const deleteItemRatings = async(req,res,next) =>{
    try{
        const item = await Item.findById(req.params.itemId);
        item.ratings = [];

        await item.save();

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({
            success: true,
            msg: 'SUCCESSFULY DELETED RATINGS IN THE ITEM!'

        })
    } catch(err){
        throw new Error(`ERROR DELETING RATINGS IN THE ITEM!`)
    }
}









//! --------------------------------------------------------ITEM RATINGS
// FOR ("/:item/ratings") ENDPOINTS ------------------------------------------------


const getItemRating = async(req,res,next) =>{
    try {
        const item = await Item.findById(req.params.itemId)
        let rating = item.ratings.find(rating => (rating._id).equals(req.params.ratingId))

        if(!rating) rating = {success: false,msg:'ERROR GETTING RATINGS IN THE ITEM!'};

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(rating)

    } catch (error) {
        throw new Error(`ERROR GETTING RATINGS IN THE ITEM: ${req.params.ratingId}`)
    }
}

const updateItemRating = async(req,res,next) =>{
    try {
        const item = await Item.findById(req.params.itemId)
        let rating = item.ratings.find(rating => (rating._id).equals(req.params.ratingId));

        if(rating){
            const ratingIndexPosition = item.ratings.indexOf(rating);
            item.ratings.splice(ratingIndexPosition, 1, req.body);
            rating = item.ratings[ratingIndexPosition];
            await item.save()
        } else{
            rating = {
                success:false,
                msg:'No rating found'
            }
        }
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(rating);

    } catch (error) {
        throw new Error(`ERROR UPDATING RATING ID : ${req.params.ratingId} IN THE ITEM: `)
    }
}

const deleteItemRating = async(req,res,next) =>{
    try{
        const item = await Item.findById(req.params.itemId);
        let rating = item.ratings.find(rating => (rating._id).equals(req.params.ratingId));

        if (rating){
            const ratingIndexPosition = item.ratings.indexOf(rating);
            item.ratings.splice(ratingIndexPosition, 1);
            rating = {
                success:true,
                msg:'Rating with ID deleted'
            }
            await item.save();
        } else{
            throw new Error(`ERROR DELETING RATING ID : ${req.params.ratingId}`)  
        }
    
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(rating)
    } catch(err){
        throw new Error(`ERROR DELETING RATINGS IN THE ITEM!`)
    }
}









//! --------------------------------------------------------UPLOADING IMAGE
// FOR ("/:item/image") ENDPOINTS ------------------------------------------------
const postItemImage = async(req,res,next) =>{
    
    if(!req.files) throw new Error(`MISSING IMAGE`);

    const file = req.files.file
    
    if(!file.mimetype.startsWith('image')) throw new Error (`Please upload an image file type`);
    if(file.size > process.env.MAX_FILE_SIZE) throw new Error(`Image exceeds size of ${process.env.MAX_FILE_SIZE}`);
    
    file.name = `photo_${path.parse(file.name).ext}`
    console.log(path.parse(file.name).ext)
    
    file.name = `photo_${file.name}`
    
    const filePath = process.env.FILE_UPLOAD_PATH + file.name
    // console.log(files.name)

    file.mv(filePath, async (err) => {
        if(err) throw new Error(`Problem uploading photo: ${err.message}`);
        await Item.findByIdAndUpdate(req.params.itemId, {image: file.name });
        res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json({success: true, data: file.name });
       })   
}


//! --------------------------------------------------------EXPORT MODULES
module.exports = {
    getItems,
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
}


