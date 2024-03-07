const Item = require('../models/item');
const Chore = require('../models/chore');
const item = require('../models/item');

async function index(req, res) {
    const items = await Item.find({}).populate('chore');
    // console.log(items)

    const chores = await Chore.find({});
    const itemChore = items.map(item=>{
        return item.chore
    })
    const itemChoreElement = itemChore.map(chore=> {
        //   return chore.map(c =>{
            return chore
        //   })

    })
    console.log(itemChoreElement)
    // console.log('item' + itemChore)
    // const item = await Item.findById(req.params.id).populate('chore');
    // console.log(item)
    // const chore = await Chore.find({ _id: {$nin: item.chore} }).sort('name');
    res.render('items/index',  {title: 'All Items', items, itemChoreElement, chores })
}

async function show(req, res) {
    const item = await Item.findById(req.params.id).populate('chore');
    const chore = await Chore.find({ _id: {$nin: item.chore} }).sort('name');
    
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
    const list = await Item.find({quantity: {$lt: 2}});
    res.render('items/shoppingList', {title: 'Shopping-list', list})
}

async function deleteItem(req, res){
    await Item.findOneAndDelete({_id: req.params.id});
        res.redirect('/items')     
}

async function edit(req, res) {
    const item = await Item.findOne({_id: req.params.id}); 
        res.render('items/edit', {title: 'Update item', item});        
    };

    async function update(req, res) {
        const { name, quantity } = req.body;
        let available = true;

        if (quantity < 1) {
            available = false;
        }
             
        await Item.findByIdAndUpdate(req.params.id, { name, quantity, available });       
        res.redirect(`/items/${req.params.id}`);
    }



module.exports = {
    index,
    show,
    new: newItem,
    create,
    addToChore,
    makeShoppingList,
    delete: deleteItem,
    edit,
    update
}

