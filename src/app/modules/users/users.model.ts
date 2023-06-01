import { Model, Schema, model } from 'mongoose';
import { IUser } from './users.interface';

type UserModel = Model<IUser, object>;

const userSchema = new Schema<IUser>(
  {
    id: {
      type: 'string',
      required: true,
      unique: true,
    },
    role: {
      type: 'string',
      required: true,
    },
    password: {
      type: 'string',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser, UserModel>('User', userSchema);
