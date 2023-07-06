/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IAdmin } from '../admin/admin.interface';
import { IFaculty } from '../faculty/faculty.interface';
import { IStudent } from '../student/student.interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  needsPasswordChange: true | false;
  passwordChangeAt?: Date;
  student?: Types.ObjectId | IStudent;
  admin?: Types.ObjectId | IAdmin;
  faculty?: Types.ObjectId | IFaculty;
};

// instance methods
// export type IUserMethods = {
//   isUserExist(id: string): Promise<Partial<IUser | null>>;
//   isPasswordMatched(
//     givenPassword: string,
//     savedPassword: string
//   ): Promise<boolean>;
// };

// Same with static methods
export type UserModel = {
  isUserExist(
    id: string
  ): Promise<Pick<IUser, 'id' | 'password' | 'needsPasswordChange' | 'role'>>;

  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
// export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
