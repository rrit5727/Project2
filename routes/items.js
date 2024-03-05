const express = require('express');
const router = express.Router();

const itemsCtrl = require('../controllers/items')

/* GET users listing. */
router.get('/', itemsCtrl.index); 
router.get('/new', itemsCtrl.new);
router.get('/:id', itemsCtrl.show);
router.post('/', itemsCtrl.create)

module.exports = router;
