import { RandomUser } from '../../integrations/RandomDataAPI/types/RandomUser';
import { IUser, IUserModel } from './user.types';

export async function findBySessionId(this: IUserModel, sessionId: string): Promise<IUser | null> {
	try {
		return await this.findOne({ sessionId });
	} catch {
		return null;
	}
}

export async function createUserWith(this: IUserModel, randomUser: RandomUser): Promise<IUser | null> {
	try {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		const { uid, first_name, last_name, email } = randomUser;

		const user = new this({
			userId: uid,
			firstName: first_name,
			lastName: last_name,
			email,
		});

		return await user.save();
	} catch (e) {
		return null;
	}
}
