export type APIResponse<T = Record<string, any>> = {
	error: string | null;
	data?: T;
};
