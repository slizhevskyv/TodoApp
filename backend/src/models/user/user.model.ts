import { model } from 'mongoose';
import UserSchema from './user.schema';
import { IUser, IUserModel } from './user.types';

const UserModel = model<IUser, IUserModel>('User', UserSchema);

export default UserModel;
