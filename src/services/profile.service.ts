import { validate } from 'class-validator';
import { BadRequestError } from '../errors/bad-request.error';
import { UpdateProfileDto } from '../dto/users/update-profile.dto';

export class ProfileService {
  async updateProfile(userId: number, updateProfileDto: UpdateProfileDto) {
    const errors = await validate(updateProfileDto);
    if (errors.length > 0) {
      throw new BadRequestError('Validation failed');
    }

    // Lanjutkan proses update profile
  }
}