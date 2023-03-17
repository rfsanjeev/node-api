import express from 'express';
import cors from 'cors';
import eventRoute from './src/routes/event.js';
import userRoute from './src/routes/user.js';
import * as dotenv from 'dotenv';
import connectDatabase from './src/database/connection.js';
import morgan from 'morgan';
import logger from "./src/middleware/logger.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import mongoSanitize from 'express-mongo-sanitize';
import helmet from "helmet";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true}))
app.use(cors());
app.use(mongoSanitize({replaceWith: '_'}));
app.use(helmet());

//setting up db connection
connectDatabase();
 
// setup the logger
app.use(morgan('combined', {stream: fs.createWriteStream(`${path.join(__dirname, 'logs')}/access.log`, {flags: 'a'})}));

app.use('/event', eventRoute);
app.use('/user', userRoute);

app.use((err, req, res, next) => {
  const { message = "something went wrong", status = 500 } = err;
  logger.error(message);
  res.status(status).send(message);
});

app.use((req,res) => {res.status(404).send('Invalid URL entered!')})

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

export default app;