import userSchema from '../schemas/user.js';

const saveUserData = async (userData) => {
    const newUser = new userSchema(userData);
    await newUser.save();
}

export default saveUserData;