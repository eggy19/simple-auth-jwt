import { Router } from 'express';
import { login, register } from '../../controllers/auth/auth.controller';
import { authenticateToken } from '../../middlewares/auth.middleware';
import { updateProfile,profile } from '../../controllers/profile/profile.controller';
import { validateDto } from '../../middlewares/validation.middleware';
import { LoginDto } from '../../dto/users/login.dto';
import { UpdateProfileDto } from '../../dto/users/update-profile.dto';


const router = Router();
router.get('/tes', (req, res) => {
    res.status(200).json({msg:'YEAY'})
})
router.post('/register', register);
router.post('/login', validateDto(LoginDto), login);
router.get('/profile', authenticateToken, profile);
router.put('/profile', authenticateToken, validateDto(UpdateProfileDto), updateProfile);

export default router;