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

async function newItem(req, res) {
    res.render('items/new', {title: 'Add item', errorMsg: ''});
}


async function create(req, res) {
    req.body.available = !!req.body.available;  
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    try {
        const item = await Item.create(req.body);
        res.redirect(`/items/${item._id}?title=Item`);
    } catch(err) {
        console.log(err);
        res.render('items/new', {errorMsg: err.message});
    }
}


module.exports = {
    index,
    show,
    new: newItem,
    create
}

