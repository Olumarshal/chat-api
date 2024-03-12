const { Redis } = require('ioredis');
require('dotenv/config');

class RedisCache {
    constructor() {
        // Connect to your cloud instance of Redis
        const options = {
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT || '6379'),
            password: process.env.REDIS_PASSWORD,
        };
        this.client = new Redis(options);

        this.client.on('connect', () => {
            console.log('Redis database connected');
        });
    }

    async get(key) {
        return await this.client.get(key);
    }

    async set(key, value, ttlSeconds) {
        if (ttlSeconds) {
            await this.client.set(key, value, 'EX', ttlSeconds);
        } else {
            await this.client.set(key, value);
        }
    }

    async delete(key) {
        await this.client.del(key);
    }
}

module.exports = RedisCache;
