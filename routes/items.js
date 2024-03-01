const express = require('express');
const router = express.Router();

const itemsCtrl = require('../controllers/items')

/* GET users listing. */
router.get('/', itemsCtrl.index); 

module.exports = router;
