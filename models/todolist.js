const mongoose = require('mongoose');
const todoListSchema = new mongoose.Schema({
taskTitle: {
    type: String,
    required: true
},
content: {
    type: String,
    required: true
},
date: {
    type: Date,
    default: Date.now
}
})
module.exports = mongoose.model('TodoTask',todoListSchema,'tasks');