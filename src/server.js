import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routers/index.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { env } from './utils/env.js';

const port = Number(env('PORT', '5000'));

export const setupServer = () => {
  const app = express();

  app.use(
    cors({
      origin: ['http://localhost:3000'],
      credentials: true,
    }),
  );
  app.use(express.json());
  app.use(cookieParser());

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });

  app.use(router);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
