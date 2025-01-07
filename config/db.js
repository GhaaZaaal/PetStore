const mongoose = require('mongoose');

const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_DB_URI, {
      useNewUrlParser: true, // To fix the URL parser deprecation warning
      useUnifiedTopology: true, // To fix the monitoring engine deprecation warning
      useCreateIndex: true,
      writeConcern: { w: 'majority', j: true }, // Fix deprecated write concern options
    })
    .then((conn) => {
      console.log(`DB Connected Successfully at Host : ${conn.connection.host}`);
    })
    .catch((err) => {
      console.error(`DB Connection Failed : ${err}`);
      process.exit(1);
    });
};

module.exports = dbConnection;
