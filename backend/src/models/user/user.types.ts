import { Model } from 'mongoose';

export interface IUser {
	userId: string;
	avatarURL: string;
	sessionId: string;
}
export interface IUserModel extends Model<IUser> {
	createUserWith: (this: IUserModel, randomUser: { uid: string; avatar: string }) => Promise<IUser | null>;
	findBySessionId: (this: IUserModel, sessionId: IUser['sessionId']) => Promise<IUser | null>;
}
