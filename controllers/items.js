const Item = require('../models/item');
const Chore = require('../models/chore')

async function index(req, res) {
    const items = await Item.find({});
    res.render('items/index',  {title: 'All Items', items })
}

async function show(req, res) {
    const item = await Item.findById(req.params.id).populate('chore');
    const chore = await Chore.find({ _id: {$nin: item.chore} }).sort('name');
    console.log(chore);
    res.render('items/show', {title: 'Item details', item, chore})
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

async function addToChore(req, res) {
    const chore = await Chore.findById(req.params.id);
    const item = await Item.findById(req.body.itemId);
    item.chore.push(req.params.id);
    await item.save();
    res.redirect(`/chores/${chore._id}`)
} 

async function makeShoppingList(req, res) {
    const list = await Item.find({quantity: {$lt: 1}});
    res.render('items/shoppingList', {title: 'Shopping-list', list})
}

module.exports = {
    index,
    show,
    new: newItem,
    create,
    addToChore,
    makeShoppingList
}

