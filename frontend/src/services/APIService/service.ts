import axios, { AxiosInstance } from 'axios';

interface IAPI {
}

class API implements IAPI {
	static instance = new API();

	private client: AxiosInstance;
	private readonly apiUrl: string;

	private constructor() {
		if (!process.env.REACT_APP_API_ENDPOINT) {
			throw new Error('REACT_APP_API_ENDPOINT or REACT_APP_API_KEY is missing. Please add them to .env file.');
		}

		this.apiUrl = process.env.REACT_APP_API_ENDPOINT;

		const headers: Record<string, string> = {
			Accept: 'application/json',
		};

		this.client = axios.create({
			baseURL: this.apiUrl,
			headers: headers,
			withCredentials: true,
		});
	}
}

export default API;
