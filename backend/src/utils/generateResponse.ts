const success = (data: Record<string, any>) => ({
	error: null,
	data,
});

const error = (err: string) => ({
	error: err,
	data: {},
});

export default { success, error };
