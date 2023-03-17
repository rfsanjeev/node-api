import userSchema from "../schemas/user.js";
import { addData } from "../models/model.js";
import expressError from '../utils/expressError.js';
import { createToken } from '../utils/jwt.js';

const userRegistration = async(req, res, next) => {
        if (req.body.userObject && req.body.userObject.id) {
            throw new expressError('User already exist with this email, please try another!');
        } else {
            await addData(userSchema, req.body);
            res.status(201).json({message: 'User created successfully!'});
        }
}

const userLogin = async(req, res, next) => {
        if (req.body.userObject && req.body.userObject.id) {
            const isPasswordMatch = await req.body.userObject.validatePassword(req.body.password);
            
            if (!isPasswordMatch) throw new expressError('InValid Email or Password!');
            else { 
                const token = createToken(req.body.userObject.id, process.env.TWT_KEY);
                res.status(200).json({token: token});
            }
        } else throw new expressError('InValid Email or Password!');
}

export { userRegistration, userLogin };