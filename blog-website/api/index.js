import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

const app = express();
app.use(express.json());

dotenv.config();
const PORT = process.env.PORT || 6001;

mongoose.connect(process.env.MONGO_URI,).then(() => {
  app.listen(PORT, () => console.log("Server Port: ", PORT));
}).catch((error) => console.log(error));


app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message;
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    dbStatusCode: err.code || null,
  });
  console.log(err);

});
