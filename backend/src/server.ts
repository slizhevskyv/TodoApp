import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { APIRouter } from './routes';
import { DBService } from './services';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	}),
);

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', APIRouter);

(async () => {
	await DBService.connect();

	app.listen(port, () => {
		console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
	});
})();
