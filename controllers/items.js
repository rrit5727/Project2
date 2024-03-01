const Item = require('../models/item');

async function index(req, res) {
    const items = await Item.find({});
    res.render('items/index',  {title: 'All Items', items })
}

module.exports = {
    index
}

