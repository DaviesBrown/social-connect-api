const { createClient } = require('redis');
const { promisify } = require('util');

class RedisClient {
  constructor() {
    this.store = createClient();
    this.store.on('error', (err) => {
      console.log(`Redis Error: ${err}`);
    });
    this.client = {
      get: (key) => {
        const getAsync = promisify(this.store.get).bind(this.store);
        return getAsync(key);
      },
      set: (key, exp, val) => {
        const setExAsync = promisify(this.store.setex).bind(this.store);
        return setExAsync(key, exp, val);
      },
      del: (key) => {
        const delAsync = promisify(this.store.del).bind(this.store);
        return delAsync(key);
      }
  }

  isAlive() {
    return this.store.connected;
  }

  async get(key) {
    const val = await this.client.get(key);
    if (!val) {
      return null;
    }
    try {
      return JSON.parse(val);
    } catch (err) {
      return null;
    }
  }

  async set(key, val, duration) {
    await this.client.set(key, duration, JSON
      .stringify(val));
  }

  async del(key) {
    try {
      await this.client.del(key);
    } catch (err) {
      console.log(`redis del: ${err}`);
    }
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
