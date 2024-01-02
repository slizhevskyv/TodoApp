import { IUser, IUserModel } from './user.types';

export async function findBySessionId(this: IUserModel, sessionId: string): Promise<IUser | null> {
	try {
		return await this.findOne({ sessionId });
	} catch {
		return null;
	}
}

export async function createUserWith(
	this: IUserModel,
	randomUser: { uid: string; avatar: string },
): Promise<IUser | null> {
	try {
		const { uid, avatar } = randomUser;
		const user = new this({
			userId: uid,
			avatarURL: avatar,
		});

		return await user.save();
	} catch (e) {
		return null;
	}
}
