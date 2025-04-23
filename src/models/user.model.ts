import { AppDataSource } from "../data-source";
import { UserProfile } from "../entities/user-profile.entity";
import { User } from "../entities/users.entity";

const userRepository = AppDataSource.getRepository(User);

export const findByUsername = async (username:string) => {
    return await userRepository.findOne({
        where: { username: username },
        relations: ['profile'] // Pastikan untuk load relasi profile
    });
}

export const findById = async (id:number) => {
    return await userRepository.findOne({
        where: {id : id},
        relations: ['profile']
    });
}

export const createUser = async (data:any) => {
    const user = new User();
    user.email = data.email;
    user.username = data.username;
    user.password = data.password;
    user.role = data.role;
    user.isActive = data.isActive;
    await user.hashPassword();

    // create empty user_profile
    const profile = new UserProfile();
    user.profile = profile;
    return await userRepository.save(user);
}

export const updateUserProfile = async (userId:number, data:any) =>{
    const user = await userRepository.findOne({
        where: { id: userId },
        relations: ['profile'] // Pastikan untuk load relasi profile
    });

    if (!user) {
        throw new Error('User not found');
    }

    // 2. Cek apakah profile sudah ada, jika belum buat baru
    if (!user.profile) {
        user.profile = new UserProfile();
    }

    user.profile.firstName = data.firstName;
    user.profile.lastName = data.lastName;
    user.profile.phone = data.phone;
    user.profile.birthDate = data.birthDate;
    user.profile.gender = data.gender;
    user.profile.address = data.address;
    user.profile.city = data.city;
    user.profile.country = data.country;
    user.profile.profilePicture = data.profilePicture;

    return await userRepository.save(user);
}