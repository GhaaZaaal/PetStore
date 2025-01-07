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
};

module.exports = dbConnection;
