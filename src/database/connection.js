import * as dotenv from 'dotenv';
import mongoDB from './mongoDB.js';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
    const connectDB = () => {
      try {
          mongoDB(process.env.DB_URL);
          console.log('Connected to Mongo Database');
      } catch (err) {
        console.log(err.message);
      }
    };

export default connectDB;