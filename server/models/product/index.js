import mongoose from 'mongoose';
import mongooseTimestamp from 'mongoose-timestamp';

const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },
    category: { type: mongoose.Types.ObjectId, required: true }
});

// add timestamp plugin
ProductSchema.plugin(mongooseTimestamp);

export default mongoose.model('Product', ProductSchema);
