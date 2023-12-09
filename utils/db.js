const mongoose = require('mongoose');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 27017;
const database = process.env.DB || 'social_media_api';
const dbUrl = `mongodb://${host}:${port}/${database}`;

class DBClient {
  async connectDB() {
    try {
      await mongoose.connect(dbUrl);
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
