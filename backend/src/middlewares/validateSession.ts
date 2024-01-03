import { Request, Response, NextFunction } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Cookie } from '../enums';
import { UserModel } from '../models';

export default async (req: Request, res: Response, next: NextFunction) => {
	const { cookies } = req;
	const sessionId = (cookies as Record<string, string>)[Cookie.Session_ID];

	if (!sessionId) {
		return res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
	}

	const user = await UserModel.findBySessionId(sessionId);

	if (!user) {
		return res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
	}

	req.session = {
		user: {
			userId: user.userId,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
		},
	};

	return next();
};
