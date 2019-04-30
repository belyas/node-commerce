import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    added_at: { type: Date, default: Date.now }
});

// Add some method as necessary
userSchema.methods.login = async function login ({email, password}) {
    try {
        const user = await this.model('User').find({ email });
        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if (passwordMatch) {
            return user;   
        }

        return false;
    } catch (error) {
        throw new Error(error);
    }
}

userSchema.methods.signup = async function signup ({firstname, lastname, email, password}) {
    try {
        const user = await this.model('User').find({ email });
        // if user's email already exists
        if (user) {
            return {
                status: false,
                message: 'User already exists, try to signin.'
            };
        }

        const hashedPasswrd = await bcrypt.hash(password, 12);

        this.firstname  = firstname;
        this.lastname   = lastname;
        this.email      = email;
        this.password   = hashedPasswrd;
        
        return this.save();
    } catch (error) {
        throw new Error(error);
    }
}

export default mongoose.model('User', userSchema);
