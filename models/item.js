const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: { type: String, required: true},
    available: {type: Boolean, default: true},
    quantity: {
        type: Number,
        min: 0,
        max: 5,
        default: 5
    },
    choreRelated: {type: Boolean, default: true},
    chore: [{
        type: Schema.Types.ObjectId,
        ref: 'Chore'
    }],    
}, {
    timestamps: true
});

module.exports = mongoose.model('Item', itemSchema);
