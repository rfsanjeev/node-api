import * as dotenv from 'dotenv';
import mongoDB from './mongoDB.js';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

    const connectDB = () => {
      try {
            const dbConfig = {
            host: process.env.DB_HOST,
            server: process.env.DB_MONGO,
            dbName: process.env.DB_NAME,
          };

          mongoDB(dbConfig);

          console.log('Connected to Mongo Database');
      } catch (err) {
        console.log(err.message);
      }
    };

export default connectDB;