import { model } from 'mongoose';
import EngagementSchema from './engagement.schema';
import { IEngagement, IEngagementModel } from './engagement.types';

const EngagementModel = model<IEngagement, IEngagementModel>('Engagement', EngagementSchema);

export default EngagementModel;
