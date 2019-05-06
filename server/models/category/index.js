import mongoose from 'mongoose';
import mongooseTimestamp from 'mongoose-timestamp';

const Schema = mongoose.Schema;
const CategorySchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true }
});

// add timestamp plugin
CategorySchema.plugin(mongooseTimestamp);

export default mongoose.model('Category', CategorySchema);
