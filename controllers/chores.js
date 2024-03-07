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
    // console.log(item)
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
  // console.log(items)
  res.render('chores/show', {title: chore.name, chore, items, itemsUsed})
}

async function deleteChore(req, res){
  await Chore.findOneAndDelete({_id: req.params.id});
      res.redirect('/chores')     
}

// async function listImpactedChores(req, res){
//   try {
//     const itemsWithZeroQuantity = await Item.find({ quantity: 0});
//     console.log('Items with zero quantity:', itemsWithZeroQuantity)
//     const itemIdsWithZeroQuantity = itemsWithZeroQuantity.map(item => item._id);
//     console.log('Item IDs with zero quantity:', itemIdsWithZeroQuantity);
//     // const chores = await Chore.find({ 'chore': { $in: itemIdsWithZeroQuantity }});
//     // console.log('chores', chores)

//     const impactedChores = await Chore.find({ _id: { $in: itemIdsWithZeroQuantity } });
//     console.log('Impacted chores:', impactedChores);
//     console.log(Chore);
//     console.log(Chore.forEach_id)
    
    
//     res.render('chores/list', {title: 'Impacted chores list', impactedChores})
//     } 

    async function listImpactedChores(req, res) {
       
        // Step 1: Find the "egg" item with a quantity of 0
        const itemsWithZeroQuantity = await Item.find({ quantity: 0 });
        console.log('itemsWithZeroQuantity', itemsWithZeroQuantity)

        // Step 2: Retrieve the chores associated with the "egg" item
        let impactedChores = [];
        for (let item of itemsWithZeroQuantity) {
            const choresForItem = await Chore.find({ _id: { $in: item.chore } });
            console.log('Chores for', item.name, ':', choresForItem);
            impactedChores = impactedChores.concat(choresForItem);
        }
        
        console.log('impactedChores', impactedChores);
        
        res.render('chores/list', { title: 'impactedChores', impactedChores });
      } 
      // catch (error) {
      //   console.error("Error:", error);
      //   throw error;
      // }
    
    
    
    
