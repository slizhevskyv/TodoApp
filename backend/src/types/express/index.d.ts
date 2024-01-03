declare namespace Express {
	interface Request {
		session?: {
			user?: {
				userId: string;
				firstName: string;
				lastName: string;
				email: string;
			};
		};
	}
}
