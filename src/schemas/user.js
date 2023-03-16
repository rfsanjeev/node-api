import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const SALT_WORK_FACTOR = 10;

const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, 'Email address is required'],
        validate: [validateEmail, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Password is require']
    },
});

userSchema.pre('save', async function(next) {
    const user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await  bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
});

userSchema.methods.validatePassword = async function (pass) {
    return bcrypt.compare(pass, this.password);
};

export default mongoose.model('user', userSchema);