import { Router } from 'express';

import {signUp, signIn, renewUserToken, getUser,updateUser} from '../controllers/user.controller';
import validateJWT from '../middlewares/validateJWT';

const router = Router();

router.post('/signup', signUp);
router.post('/signin', signIn);

router.post('/', validateJWT, renewUserToken);
 router.put('/updateUser',updateUser);
router.get('/getUser',getUser)

export default router;