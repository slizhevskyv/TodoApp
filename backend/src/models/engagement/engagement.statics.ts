import { IEngagement, IEngagementModel } from './engagement.types';
import { Engagement } from '../../enums';

// eslint-disable-next-line import/prefer-default-export
export async function createEngagementFor(
	this: IEngagementModel,
	type: Engagement,
	userId: string,
): Promise<IEngagement | null> {
	try {
		const engagement = new this({
			type,
			userId,
		});

		return await engagement.save();
	} catch (e) {
		return null;
	}
}
