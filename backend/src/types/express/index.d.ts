declare namespace Express {
	interface Request {
		session?: {
			user?: {
				avatarURL: string;
				userId: string;
			};
		};
	}
}
