const mongoose = require("mongoose");

const connectDatabse = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDb Connection Successfull");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = connectDatabse;
