import { Schema } from 'mongoose';
import generateRandomBytes from '../../utils/generateRandomBytes';
import { createUserWith, findBySessionId } from './user.statics';
import { IUser, IUserModel } from './user.types';

const UserSchema = new Schema<IUser, IUserModel>({
	userId: {
		type: String,
		required: true,
		unique: true,
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	sessionId: {
		type: String,
		default: () => generateRandomBytes(),
	},
});

UserSchema.static('findBySessionId', findBySessionId);
UserSchema.static('createUserWith', createUserWith);

export default UserSchema;
