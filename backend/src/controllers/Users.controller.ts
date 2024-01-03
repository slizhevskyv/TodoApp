import { Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import RandomDataAPI from '../integrations/RandomDataAPI';
import { UserModel } from '../models';
import { Cookie } from '../enums';
import RespondWith from '../utils/generateResponse';

const createUser = async (req: Request, res: Response) => {
	try {
		const randomUser = await RandomDataAPI.getUser();

		if (!randomUser) {
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(RespondWith.error('Unable to query 3-rd party API.'));
		}

		const createdUser = await UserModel.createUserWith(randomUser);

		if (!createdUser) {
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(RespondWith.error('Unable to create a user.'));
		}

		const { sessionId, firstName, lastName, email } = createdUser;

		res.cookie(Cookie.Session_ID, sessionId);

		return res.status(StatusCodes.OK).json(
			RespondWith.success({
				firstName,
				lastName,
				email,
			}),
		);
	} catch (e) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(RespondWith.error(ReasonPhrases.INTERNAL_SERVER_ERROR));
	}
};
const getUser = (req: Request, res: Response) =>
	res.status(StatusCodes.OK).json(RespondWith.success({ ...(req.session?.user ?? {}) }));

export { createUser, getUser };
