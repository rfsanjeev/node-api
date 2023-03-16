import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

const mongoDB = (dbUrl) => {
  mongoose
    .connect(dbUrl, {
      useNewURLParser: true,
      useUNifiedTopology: true,
    })
    .then(() => {
      console.log("CONNECTION OPEN!");
    })
    .catch((err) => {
      console.log("CONNECTION ERROR!");
      console.log(err);
    });
};

export default mongoDB;