import eventSchema from '../schemas/event.js';
import userSchema from '../schemas/user.js';
import catchAsync from '../utils/catchAsync.js';
import expressError from '../utils/expressError.js';
import { verifyToken } from '../utils/jwt.js';

const checkJwtToken = catchAsync( async ( req, res, next) => {
    const header = req.headers.authorization;
    if (!header) throw new expressError('Error! Token was not provided.', 401)

    const decodedToken = verifyToken(header.trim(), process.env.TWT_KEY);

    if (decodedToken && decodedToken.userId) {
           req.body.user_id = decodedToken.userId; 
           const userData = await userSchema.findById(decodedToken.userId, 'id');

            if (!userData) throw new expressError('Invalid Access Token', 401);
    } else throw new expressError('Invalid Access Token', 401);
    next();
});

const isUserAllowToAccess = catchAsync( async(req, res, next) => {
    const { id } = req.params;
    const eventData = await eventSchema.findById(id, 'user_id');

    if(!eventData || (eventData && eventData.user_id.toString() !== req.body.user_id)) 
        throw new expressError('Do not have permission to access this Event', 401);
    next();
});

const isUserExist = async (req, res, next) => {
    const {email} = req.body;
    req.body.userObject = await userSchema.findOne({ email: email }, 'email id password');
    next();
}

export  { checkJwtToken, isUserAllowToAccess, isUserExist };