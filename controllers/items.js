const Item = require('../models/item');

async function index(req, res) {
    const items = await Item.find({});
    res.render('items/index',  {title: 'All Items', items })
}

async function show(req, res) {
    const item = await Item.findById(req.params.id);
    console.log(item);
    res.render('items/show', {title: 'Item details', item})
}

async function newItem(res, req) {

    res.render('items/new', {title: 'Add item', errorMsg: ''});
}



module.exports = {
    index,
    show,
    new: newItem
}

