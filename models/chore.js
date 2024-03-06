const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const choreSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
}, 

}, {
    timestamps: true,
    strictPopulate: false
});

module.exports = mongoose.model('Chore', choreSchema);