import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../utils/jwt';
import { createUser, findByUsername } from '../../models/user.model';

const dummyUser = {
  username: 'eggymon',
  password: '$2a$10$abc12345678hashhashhash', // hashed password
};

export const register = async (req:Request, res : Response): Promise<void> => {
  const {username, password} = req.body;

  try {
    const existingUser = await findByUsername(username);
    if (existingUser) {
      res.status(400).json({ message: 'Username already exists' });
      return;  
    }

    //create user
    const user = await createUser(req.body);
    res.status(201).json({
      message: 'User registered successfully',
      user: {
          // id: user.id,
          username: user.username,
          createdAt: user.createdAt
        }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const login = async (req: Request, res: Response, next:NextFunction): Promise<void> => {
  const { username, password } = req.body;

  try {
    // Cari user
    const user = await findByUsername(username);
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // Validasi password
    const isValidPassword = await user.comparePassword(password)
    if (!isValidPassword) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // Generate token
    const token = generateToken({ userId: user.id, username: user.username });

    res.status(200).json({ token, msg:'sukses login dan mendapatkan token' });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// export const profile = async (req: Request, res: Response) => {
//   const existingUser = await findByUsername(req.user.username);

//   // User sudah divalidasi oleh middleware
//   res.json({  
//         email : existingUser?.email,
//         username : existingUser?.username,
//         role : existingUser?.role,
//         isActive : existingUser?.isActive,
//         createdAt : existingUser?.createdAt,
//         updatedAt : existingUser?.updatedAt  
//       });
// };
