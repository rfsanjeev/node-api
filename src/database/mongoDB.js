import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

const mongoDB = (dbConfig) => {
  const connectionString = `${dbConfig.server}://${dbConfig.host}/${dbConfig.dbName}?retryWrites=true&w=majority`;

  mongoose
    .connect(connectionString, {
      useNewURLParser: true,
      useUNifiedTopology: true
    })
    .then(() => {
      console.log('CONNECTION OPEN!');
    })
    .catch((err) => {
      console.log('CONNECTION ERROR!');
      console.log(err);
    });
};

export default mongoDB;