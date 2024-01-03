import { Request, Response, NextFunction } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import config from 'config';

export default async (req: Request, res: Response, next: NextFunction) => {
	const { headers } = req;
	const { apikey } = headers;

	const configApiKey = config.get('server.apiKey');

	if (apikey !== configApiKey) {
		return res.status(StatusCodes.FORBIDDEN).send(ReasonPhrases.FORBIDDEN);
	}

	return next();
};
