const Chore = require('../models/chore');
const Item = require('../models/item');

module.exports = {
    new: newChore,
    create,
    addToItem,
    index,
    show,
    delete: deleteChore,
    listImpactedChores
}

//Standard CRUD funcationalities for chores ⌄⌄⌄
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

async function index(req, res) {
  const chores = await Chore.find({});
  res.render('chores/index', {title: 'All Chores', chores})
}

async function show(req, res) {
  const chore = await Chore.findById(req.params.id).populate('itemsUsed');
  const items = await Item.find({ _id: {$nin: chore.itemsUsed} }).sort('name');
  const itemsUsed = await Item.find({chore: req.params.id})
  // console.log(items)
  res.render('chores/show', {title: chore.name, chore, items, itemsUsed})
}

async function deleteChore(req, res){
  await Chore.findOneAndDelete({_id: req.params.id});
  res.redirect('/chores')     
}

//Standard CRUD funcationalities for chores ^^^

// Special purpose chore functions ⌄⌄⌄

// This allows you to add a chore to a chore
async function addToItem(req, res) {
    const item = await Item.findById(req.params.id);
    item.chore.push(req.body.choreId);
    // console.log(item)
    await item.save();
    res.redirect('/items')
} 

//This generates a list of chores impacted by a depleted item (quantity of 0)
// and redirects to a separate impacted list view
async function listImpactedChores(req, res) {
  try {
      // Step 1: Find the items with a quantity of 0
      const itemsWithZeroQuantity = await Item.find({ quantity: 0 });

      // Step 2: Retrieve the unique chores associated with the items
      const uniqueChores = new Set(); // Use a set to ensure uniqueness
      for (const item of itemsWithZeroQuantity) {
          const choresForDepletedItem = await Chore.find({ _id: { $in: item.chore } });
          console.log('item.chore', item.chore)
          choresForDepletedItem.forEach(chore => uniqueChores.add(chore._id.toString())); // Add chore IDs to the set
      }

    // Convert chore IDs back to objects
      const impactedChores = await Chore.find({ _id: { $in: Array.from(uniqueChores) } });

      console.log('impactedChores', impactedChores);
      
      res.render('chores/list', { title: 'Impacted Chores', impactedChores });
  } catch (error) {
      console.error('Error:', error);
      throw error;
  }
} 
     
    
    
    
    
