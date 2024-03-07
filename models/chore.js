const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const choreSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
}, user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
}
}, {
    timestamps: true,
    strictPopulate: false
});

module.exports = mongoose.model('Chore', choreSchema);