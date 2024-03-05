const Chore = require('../models/chore');
const Item = require('../models/item');

module.exports = {
    new: newChore,
    create,
    addToItem
}

async function newChore(req, res) {
    
    const chores = await Chore.find({}).sort('name');
    res.render('chores/new', { title: 'Add Chore', chores });
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