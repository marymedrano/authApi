import 'regenerator-runtime/runtime';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const validateJWT = async (req, res, next) => {
    const tokenreq = req.headers.authorization;

    if (!tokenreq) {
        return res.status(401).json({msg: 'There is no token on the request'});
    }

    try {
        const token = tokenreq.slice(7)

        const {id} = jwt.verify(token, process.env.TOKEN_SECRET);
        
        const user = await User.findById(id);

        if (!user) {
            res.status(401).json({msg: 'Invalid token'});
        }
        
        req.user = user;
        
        next();
    } catch (error) {
        res.status(401).json({msg: 'Invalid token'});
    }
}

export default validateJWT;