const Chore = require('../models/chore');
const Item = require('../models/item');

module.exports = {
    new: newChore,
    create,
    addToItem,
    index,
    show,
    delete: deleteChore
}

async function newChore(req, res) {
    
    const chore = await Chore.find({}).sort('name');
    res.render('chores/new', { title: 'Add Chore', chore });
  }
  
  async function create(req, res) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    
    try {
      await Chore.create(req.body);
    } catch (err) {
      console.log(err);
    }
    res.redirect('/chores/new');
  }


async function addToItem(req, res) {
    const item = await Item.findById(req.params.id);
    item.chore.push(req.body.choreId);
    console.log(item)
    await item.save();
    res.redirect('/items')
} 

async function index(req, res) {
  const chores = await Chore.find({});
  res.render('chores/index', {title: 'All Chores', chores})
}

async function show(req, res) {
  const chore = await Chore.findById(req.params.id).populate('itemsUsed');
  const items = await Item.find({ _id: {$nin: chore.itemsUsed} }).sort('name');
  const itemsUsed = await Item.find({chore: req.params.id})
  console.log(items)
  res.render('chores/show', {title: chore.name, chore, items, itemsUsed})
}

async function deleteChore(req, res){
  await Chore.findOneAndDelete({_id: req.params.id});
      res.redirect('/chores')     
}