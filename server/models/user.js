import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstname: String,
    lastname: String,
    password: String
});

// Add some method as necessary

export default mongoose.model('User', userSchema);
