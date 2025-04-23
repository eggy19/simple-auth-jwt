import { Router } from 'express';
import { login, register } from '../../controllers/auth/auth.controller';
import { authenticateToken } from '../../middlewares/auth.middleware';
import { updateProfile,profile } from '../../controllers/profile/profile.controller';


const router = Router();
router.get('/tes', (req, res) => {
    res.status(200).json({msg:'YEAY'})
})
router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticateToken, profile);
router.put('/profile', authenticateToken, updateProfile);

export default router;