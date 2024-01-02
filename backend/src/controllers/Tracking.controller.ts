import { Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { EngagementModel, UserModel } from '../models';
import isEngagementType from '../typeguards/isEngagementType';
import RespondWith from '../utils/generateResponse';

const trackUsers = async (req: Request, res: Response) => {
	try {
		return res.status(StatusCodes.OK).json(RespondWith.success({}));
	} catch (e) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(RespondWith.error(ReasonPhrases.INTERNAL_SERVER_ERROR));
	}
};

const trackEngagements = async (req: Request, res: Response) => {
	try {
		const { type } = req.body;

		if (!isEngagementType(type)) {
			return res.status(StatusCodes.BAD_REQUEST).json(RespondWith.error('Invalid engagement' + ' type.'));
		}

		if (!req.session?.user?.userId) {
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(RespondWith.error('Invalid session.'));
		}

		await EngagementModel.createEngagementFor(type, req.session.user.userId);

		return res.status(StatusCodes.OK).json(RespondWith.success({}));
	} catch (e) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(RespondWith.error(ReasonPhrases.INTERNAL_SERVER_ERROR));
	}
};

const getReport = async (req: Request, res: Response) => {
	try {
		const users = await UserModel.find({});
		const engagements = await EngagementModel.find({});

		const engagementsByUserId = engagements.reduce(
			(acc, doc) => {
				acc[doc.userId] = true;

				return acc;
			},
			{} as Record<string, true>,
		);

		const totalUsers = users.length;
		const engagedUsers = users.filter(u => engagementsByUserId[u.userId]).length;

		res.status(StatusCodes.OK).json(RespondWith.success({ totalUsers, engagedUsers }));
	} catch (e) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(RespondWith.error(ReasonPhrases.INTERNAL_SERVER_ERROR));
	}
};

export { trackUsers, trackEngagements, getReport };
