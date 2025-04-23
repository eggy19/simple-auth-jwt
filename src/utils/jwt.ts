import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET || 'secret_default';
const expiresIn = process.env.JWT_EXPIRES_IN || '1h';

// export const generateToken = (payload: object): string => {
//   return jwt.sign(payload, SECRET, { expiresIn: '1h' });
// };

// export const verifyToken = (token: string): any => {
//   return jwt.verify(token, SECRET);
// };

export const generateToken = (payload: object): string => {
  // return jwt.sign(payload, secret, { expiresIn : expiresIn});
  return jwt.sign(payload, secret, {expiresIn: '1h'})
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};