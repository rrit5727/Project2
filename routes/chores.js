const express = require('express');
const router = express.Router();
const choresCtrl = require('../controllers/chores')

// This router is mounted to a "starts with" path of '/'

router.get('/chores/new', choresCtrl.new);
router.post('/chores', choresCtrl.create);
router.get('/chores', choresCtrl.index);
router.get('chores/:id', choresCtrl.show)


router.post('/items/:id/chores', choresCtrl.addToItem);

module.exports = router;