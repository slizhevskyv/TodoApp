import { Model } from 'mongoose';
import { Engagement } from '../../enums';

export interface IEngagement {
	type: string;
	userId: string;
}

export interface IEngagementModel extends Model<IEngagement> {
	createEngagementFor: (this: IEngagementModel, type: Engagement, userId: string) => Promise<IEngagement | null>;
}
