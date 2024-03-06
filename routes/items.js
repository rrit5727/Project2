const express = require('express');
const router = express.Router();

const itemsCtrl = require('../controllers/items');
const items = require('../controllers/items');

/* GET users listing. */
router.get('/', itemsCtrl.index); 
router.get('/new', itemsCtrl.new);
router.get('/list', itemsCtrl.makeShoppingList)
router.get('/:id', itemsCtrl.show);
router.delete('/:id', itemsCtrl.delete)
router.post('/', itemsCtrl.create);
router.get('/:id/edit', itemsCtrl.edit);


// router.post('/chores/:id/items', itemsCtrl.addToChore);

module.exports = router;
