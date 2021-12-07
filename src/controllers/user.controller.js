import 'regenerator-runtime/runtime'
import User from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { registerValidation, loginValidation, } from '../helpers/validation';

function createToken(user){
    return jwt.sign({id: user._id}, process.env.TOKEN_SECRET, {
        expiresIn: 86400
    })
}

export const signUp = async (req, res) => {
    // Validate the data
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if user is already in the database
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send('Email already exist');

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role
    });

    try {
        const savedUser = await user.save();
        return res.status(201).json({user: savedUser, token: createToken(savedUser)});
    } catch (error) {
        return res.status(400).send(error);
    }
}

export const signIn = async (req, res) => {
    // Validate the data
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if email exist
    const user = await User.findOne({name: req.body.user});
    if (!user) return res.status(400).send('User or password are wrong');

    // Password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('User or password are wrong');

    return res.status(200).json({role: user.role, token: createToken(user)});
}

export const getUser = async (req, res) => {
    const users= await User.find();
    res.json(users)
  };

// export const updateUser = async (req, res) => {

//     try {
//         const userDB = await User.findOne({email: req.body.email});
//         if (!userDB) {
//             return res.status(404).json({
//                 ok: false,
//                 msg: 'user email not found'
//             });
//         }

//         const { Habilitado, Propios, Terceros } = req.body.loan;            
//         //modify directly
//         userDB.permissions.loan = {
//             Habilitado,Propios,Terceros
//         };
//         const update = {
//             permissions:userDB.permissions
//         }
//         const Character = mongoose.model('Character', new mongoose.Schema({       
//             email:String,
//             permissions:_mongoose.Schema.Types.Mixed                
//         }));

//         const filter = {email:req.params?.email}
//         const userUpdate = await Character.findOneAnUpdate(filter,update,{
//             new:true
//         });        

//         res.json({
//             ok: true,
//             userUpdate
//         });
//         console.log(userUpdate);
//     } catch (error) {        
//         res.status({
//             ok: false,
//             msg: "error update"
//         });
//     }
// }

export const renewUserToken = async (req, res) => {
    return res.status(200).json({role: req.user.role, token: createToken(req.user)});
}