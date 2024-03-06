const express = require('express');
const router = express.Router();
const choresCtrl = require('../controllers/chores')
const itemsCtrl = require('../controllers/items')

// This router is mounted to a "starts with" path of '/'

router.get('/chores/new', choresCtrl.new);
router.post('/chores', choresCtrl.create);
router.get('/chores', choresCtrl.index);
router.get('/chores/:id', choresCtrl.show)


router.post('/items/:id/chores', choresCtrl.addToItem);
router.post('/chores/:id/items', itemsCtrl.addToChore);

module.exports = router;