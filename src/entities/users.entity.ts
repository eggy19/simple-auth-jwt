import bcrypt from 'bcryptjs';
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserProfile } from './user-profile.entity';

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, length:50})
  username!: string;

  @Column({length:200})
  password!: string;

  @Column({length:100})
  email!:string;

  @Column({
    type:"enum",
    enum: UserRole,
    default: UserRole.USER
  })
  role!:UserRole;

  @Column()
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToOne(() => UserProfile, profile => profile.user, { cascade: true })
  profile!: UserProfile;

  // Method untuk hash password
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }

  // Method untuk memverifikasi password
  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

// Contoh data users
// const users: User[] = [
//   {
//     id: 1,
//     username: 'user1',
//     password: bcrypt.hashSync('password1', 8),
//   },
//   {
//     id: 2,
//     username: 'user2',
//     password: bcrypt.hashSync('password2', 8),
//   },
// ];

// export const findUserByUsername = async (username: string): Promise<User | undefined> => {
//   return users.find(user => user.username === username);
// };

// export const validatePassword = async (user: User, password: string): Promise<boolean> => {
//   return bcrypt.compareSync(password, user.password);
// };
