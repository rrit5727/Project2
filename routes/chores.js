const express = require('express');
const router = express.Router();
const choresCtrl = require('../controllers/chores')

// This router is mounted to a "starts with" path of '/'

router.get('/chores/new', choresCtrl.new);
router.post('/chores', choresCtrl.create);

router.post('/items/:id/chores', choresCtrl.addToItem);