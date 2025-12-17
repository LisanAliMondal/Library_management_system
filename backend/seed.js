const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Book = require('./models/Book');
const Member = require('./models/Member');
const Issue = require('./models/Issue');

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('MongoDB connected');
    
    // Create admin user if not exists
    const existingAdmin = await User.findOne({ username: 'admin', role: 'admin' });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({ username: 'admin', password: hashedPassword, role: 'admin' });
      console.log('Admin user created: username=admin, password=admin123');
    }
    
    // Create sample book
    await Book.create({
      name: 'Sample Book',
      author: 'Sample Author',
      type: 'book',
      serialNo: 'BK001',
      category: 'Fiction',
      cost: '500',
      procurementDate: new Date()
    });
    
    // Create sample member
    await Member.create({
      memberNo: 'MEM001',
      name: 'Sample Member',
      email: 'member@example.com',
      phone: '1234567890',
      startDate: new Date(),
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
    });
    
    console.log('Database seeded successfully');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
