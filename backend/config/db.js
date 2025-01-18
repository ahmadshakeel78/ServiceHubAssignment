const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use the MONGO_URI from environment variables
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/ServiceHubDb';
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
