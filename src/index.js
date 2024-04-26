import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { userRoutes } from './routes/userRoutes.js';
import { bookRoutes } from './routes/bookRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());

app.all('/', (req, res) => {
  res.json({ message: 'Hello From Book Management API' });
});

app.use((req, res, next) => {
  if (req.path.startsWith('/user') || req.path.startsWith('/books')) {
    next();
  } else {
    res.status(404).json({ error: 'Route not found' });
  }
});

app.use('/user', userRoutes);
app.use('/books', bookRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Server is running on port ${process.env.PORT} 🚀🚀`
      );
    });
  })
  .catch(err => console.error(err));
