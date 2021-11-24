import { Router } from 'express';

import {signUp, signIn, renewUserToken, updateUser, getUser} from '../controllers/user.controller';
import validateJWT from '../middlewares/validateJWT';

const router = Router();

router.post('/signup', signUp);
router.post('/signin', signIn);

router.post('/', validateJWT, renewUserToken);
router.put('/updateUser',validateJWT, updateUser);
router.get('/getUser',validateJWT,getUser)

export default router;