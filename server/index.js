import express from 'express';
import dotenv from 'dotenv';
import userRoute from './src/routes/userRoute.js';
import recordRoute from './src/routes/recordRoute.js';
import mockRoute from './src/routes/mockRoute.js';
import errorHandler from './src/middlewares/errorMiddleware.js';
import connectDB from './src/configs/db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
// recommended to always use extended: false (more secure and simple parsing)
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use('/api/users', userRoute);
app.use('/api/records', recordRoute);
app.use('/api/mocks', mockRoute);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
