import mongoose from 'mongoose';
import mongooseTimestamp from 'mongoose-timestamp';

const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

// Add some method as necessary

// add plugin (add/update date)
userSchema.plugin(mongooseTimestamp);

export default mongoose.model('User', userSchema);
