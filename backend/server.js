import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
const port = process.env.PORT || 5000;
import userRoutes from './routes/userRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import competenceRoutes from './routes/competenceRoutes.js';
import matrixRoutes from './routes/matrixRoutes.js';
import assignmentRoutes from './routes/assignmentRoutes.js';

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/competences', competenceRoutes);
app.use('/api/matrix', matrixRoutes);
app.use('/api/assignments', assignmentRoutes);

app.get('/', (req, res) => {
  console.log(req);
  return res.send('welcome cuckoooooooooo!');
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
