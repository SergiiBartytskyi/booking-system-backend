import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './utils/env.js';

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  const port = Number(env('PORT', '3000'));
  app.listen(port, () => console.log(`Server is running on port ${port}`));
};
