import axios from 'axios';
import { RandomUser } from './types/RandomUser';

class RandomDataAPI {
	static async getUser(): Promise<RandomUser | null> {
		try {
			const { data = null } = (await axios.get<RandomUser>('https://random-data-api.com/api/v2/users')) ?? {};

			return data;
		} catch (e) {
			return null;
		}
	}
}

export default RandomDataAPI;
