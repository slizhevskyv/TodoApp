import { Model } from 'mongoose';
import { RandomUser } from '../../integrations/RandomDataAPI/types/RandomUser';

export interface IUser {
	userId: string;
	firstName: string;
	lastName: string;
	email: string;
	sessionId: string;
}
export interface IUserModel extends Model<IUser> {
	createUserWith: (this: IUserModel, randomUser: RandomUser) => Promise<IUser | null>;
	findBySessionId: (this: IUserModel, sessionId: IUser['sessionId']) => Promise<IUser | null>;
}
