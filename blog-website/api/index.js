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


// This is the error handler middleware
// Error handler middleware should be the last one
// app.use((err, req, res, next) => {
//   // Log error information
//
//   // Ensure only one response is sent
//   if (!res.headersSent) {
//     const statusCode = err.statusCode || 500;
//     const message = err.message;
//     res.status(statusCode).json({
//       success: false,
//       statusCode,
//       message,
//       dbStatusCode: err.code || null,
//     });
//     console.log("Error from error handler middleware (index.js):");
//     console.log(err);
//   } else {
//     console.log('Headers already sent, cannot send response.');
//   }
// });
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
  console.log("Error from middleware (index.js):");
  console.log(err);
});
