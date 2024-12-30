import mongoose from "mongoose";

export const dbConnection = () => {
  const mongoURI ="mongodb://127.0.0.1:27017/";

  if (!mongoURI) {
    console.log("MongoDB URI is not defined.");
    return;
  }

  mongoose
    .connect(mongoURI, {
      //useNewUrlParser: true,
      //useUnifiedTopology: true,
      dbName: "eEthioHire",
    })
    .then(() => {
      console.log("Connected to the database.");
    })
    .catch((err) => {
      console.log(`An error occurred while connecting to the database: ${err}`);
    });
};