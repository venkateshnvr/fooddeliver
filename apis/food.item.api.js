const express = require('express');
const foodItems = require('./../schema/food.item.model')

module.exports = route = express.Router();

route.post('/fooditems', (req, res) => {
    const { itemName, description, itemImageUrl } = req.body;
    let items = new foodItems({itemName, description, itemImageUrl})
    items.save()
    .then(() => res.status(200).json({
        items
    }))
    .catch(err => console.log(err))
})

route.get('/fooditems', (req, res) => {
    foodItems.find({})
    .then(data => res.status(200).json(data))
})