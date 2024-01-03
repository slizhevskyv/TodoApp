import mongoose from 'mongoose';

class DBService {
	static async connect() {
		console.log(process.env.MONGO_CONNECTION_URL);
		if (!process.env.MONGO_CONNECTION_URL) {
			throw new Error('Please provide value for MONGO_CONNECTION_URL env variable.');
		}

		await mongoose.connect(process.env.MONGO_CONNECTION_URL);

		console.log('The app successfully connected to MongoDB.');
	}
}

export default DBService;
