const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('MongoDB connected');
    await mongoose.connection.db.collection('issues').deleteMany({});
    console.log('All issues deleted');
    process.exit(0);
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
