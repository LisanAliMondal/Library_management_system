const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('MongoDB connected');
    await mongoose.connection.db.collection('requests').drop().catch(() => console.log('No requests collection'));
    console.log('Requests collection deleted');
    process.exit(0);
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
