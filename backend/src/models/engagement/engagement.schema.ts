import { Schema } from 'mongoose';
import { IEngagement, IEngagementModel } from './engagement.types';
import { createEngagementFor } from './engagement.statics';

const EngagementSchema = new Schema<IEngagement, IEngagementModel>({
	userId: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
});

EngagementSchema.static('createEngagementFor', createEngagementFor);

export default EngagementSchema;
