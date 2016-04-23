var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    title: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, default: 1 },
    description: String,
    imageBin: { data: Buffer, contentType: String },
    imageUrl: String,
    categories: [{ type: String,index:true }]
}).index({
 "$**": "text"
});

module.exports = mongoose.model('Product', ProductSchema);