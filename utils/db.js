/* eslint-disable class-methods-use-this */
const mongoose = require('mongoose');

class DBClient {
  async connectDB() {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }

  isAlive() {
    if (mongoose.connection.readyState === 1) {
      return true;
    }
    return false;
  }
}
const dbClient = new DBClient();
module.exports = dbClient;
