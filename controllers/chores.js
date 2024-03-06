const Chore = require('../models/chore');
const Item = require('../models/item');

module.exports = {
    new: newChore,
    create,
    addToItem,
    index,
    show
}

async function newChore(req, res) {
    
    const chore = await Chore.find({}).sort('name');
    res.render('chores/new', { title: 'Add Chore', chore });
  }
  
  async function create(req, res) {
    
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
    await item.save();
    res.redirect(`/items/${item._id}`)
} 

async function index(req, res) {
  const chores = await Chore.find({});
  res.render('chores/index', {title: 'All Chores', chores})
}

async function show(req, res) {
  const chore = await Chore.findById(req.params.id);
  res.render('chores/show', {chore})
}