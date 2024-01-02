import { Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { EngagementModel } from '../models';
import RespondWith from '../utils/generateResponse';

const getEngagements = async (req: Request, res: Response) => {
	try {
		if (!req.session?.user?.userId) {
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(RespondWith.error('Invalid session.'));
		}

		const engagements = await EngagementModel.find({ userId: req.session.user.userId });
		const engagementsByType = engagements.reduce(
			(acc, { type }) => {
				acc[type] = true;

				return acc;
			},
			{} as Record<string, boolean>,
		);

		return res.status(StatusCodes.OK).json(RespondWith.success(engagementsByType));
	} catch (e) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(RespondWith.error(ReasonPhrases.INTERNAL_SERVER_ERROR));
	}
};

// eslint-disable-next-line import/prefer-default-export
export { getEngagements };
