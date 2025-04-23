import { Request, Response } from 'express';
import { findById, findByUsername, updateUserProfile } from '../../models/user.model';

export const profile = async (req: Request, res: Response) => {
  const existingUser = await findByUsername(req.user.username);

  // User sudah divalidasi oleh middleware
  res.json({  
        email : existingUser?.email,
        username : existingUser?.username,
        role : existingUser?.role,
        isActive : existingUser?.isActive,
        createdAt : existingUser?.createdAt,
        updatedAt : existingUser?.updatedAt ,
        profiles: existingUser?.profile
      });
};

export const updateProfile = async (req:Request, res: Response) => {
    const userId = req.user.userId;
    const body = req.body;

    try {

        const profile = await updateUserProfile(userId, body);
        res.json({ 
            message: 'Profile updated successfully',
            profile: {
                firstName: profile.profile.firstName,
                lastName: profile.profile.lastName,
                birthDate: profile.profile.birthDate,
                gender: profile.profile.gender,
                phone: profile.profile.phone,
                address: profile.profile.address,
                city: profile.profile.city,
                country: profile.profile.country,
                profilePicture: profile.profile.profilePicture,
            }
        });

    } catch (error:any) {
         console.error(error);
        res.status(500).json({ message: error.message });
    }

}