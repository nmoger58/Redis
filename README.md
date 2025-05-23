# Redis

<div align="center">
  <img src="/api/placeholder/650/200" alt="Redis Logo" width="650" height="200">
  <br>
  <h3>The open-source, in-memory data structure store</h3>
  <p>Used as a database, cache, message broker, and streaming engine</p>
  
  [![Build Status](https://img.shields.io/travis/redis/redis/master.svg)](https://travis-ci.org/redis/redis)
  [![GitHub release](https://img.shields.io/github/release/redis/redis.svg)](https://github.com/redis/redis/releases/latest)
  [![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
  [![Docker Pulls](https://img.shields.io/docker/pulls/redis/redis-stack.svg)](https://hub.docker.com/r/redis/redis-stack/)
</div>

## 📋 Overview

Redis (Remote Dictionary Server) is an open-source, in-memory data structure store that can be used as a database, cache, message broker, and streaming engine. Redis provides data structures such as strings, hashes, lists, sets, sorted sets with range queries, bitmaps, hyperloglogs, geospatial indexes, and streams.

Redis has built-in replication, Lua scripting, LRU eviction, transactions, and different levels of on-disk persistence, and provides high availability via Redis Sentinel and automatic partitioning with Redis Cluster.

## ✨ Key Features

- **Lightning Fast**: In-memory storage provides sub-millisecond latency
- **Rich Data Structures**: Supports strings, lists, sets, sorted sets, hashes, streams, and more
- **Versatile**: Works as a database, cache, message broker, and streaming engine
- **Persistent**: Optional durability through AOF and RDB mechanisms
- **Highly Available**: Supports replication, Redis Sentinel, and Redis Cluster
- **Extensible**: Modules API for extending Redis functionality
- **Cross-Platform**: Works on Linux, macOS, Windows, and more

## 🚀 Installation

### Using Docker

```bash
# Pull and run Redis Docker image
docker run --name my-redis -p 6379:6379 -d redis:latest

# To use Redis Stack (Redis + additional modules)
docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
```

### From Package Manager

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install redis-server
sudo systemctl enable redis-server
sudo systemctl start redis-server
```

**macOS:**
```bash
brew install redis
brew services start redis
```

**Windows:**

Download the MSI installer from [Redis for Windows](https://github.com/MicrosoftArchive/redis/releases)

### From Source

```bash
wget https://download.redis.io/releases/redis-7.2.4.tar.gz
tar xzf redis-7.2.4.tar.gz
cd redis-7.2.4
make
make test
sudo make install
```

## 🔧 Configuration

The Redis configuration file is typically located at `/etc/redis/redis.conf` on Linux systems. Here are some common configurations:

```
# Network
bind 127.0.0.1
port 6379
protected-mode yes

# General
daemonize yes
pidfile /var/run/redis/redis-server.pid
loglevel notice
logfile /var/log/redis/redis-server.log

# Memory Management
maxmemory 512mb
maxmemory-policy allkeys-lru

# Persistence
save 900 1
save 300 10
save 60 10000
```

## 💻 Usage Examples

### Basic Operations

```bash
# Start Redis CLI
redis-cli

# Set a key-value pair
> SET user:1 "John Doe"
OK

# Get a value by key
> GET user:1
"John Doe"

# Store a hash
> HSET user:2 name "Jane Smith" age 42 city "New York"
(integer) 3

# Get all fields from a hash
> HGETALL user:2
1) "name"
2) "Jane Smith"
3) "age"
4) "42"
5) "city"
6) "New York"

# Set expiration on a key (in seconds)
> SETEX session:123 3600 "user:1"
OK

# Work with lists
> LPUSH notifications "message 1"
(integer) 1
> LPUSH notifications "message 2"
(integer) 2
> LRANGE notifications 0 -1
1) "message 2"
2) "message 1"
```

### Using Redis with Programming Languages

#### Python Example

```python
import redis

# Connect to Redis
r = redis.Redis(host='localhost', port=6379, db=0)

# String operations
r.set('counter', 1)
r.incr('counter')
print(r.get('counter'))  # Returns b'2'

# List operations
r.rpush('fruits', 'apple', 'banana', 'cherry')
print(r.lrange('fruits', 0, -1))  # Returns [b'apple', b'banana', b'cherry']

# Hash operations
r.hset('user:100', mapping={
    'username': 'johndoe',
    'email': 'john@example.com',
    'visits': 10
})
r.hincrby('user:100', 'visits', 1)
print(r.hgetall('user:100'))  
# Returns {b'username': b'johndoe', b'email': b'john@example.com', b'visits': b'11'}
```

#### Node.js Example

```javascript
const redis = require('redis');

async function main() {
  const client = redis.createClient({
    url: 'redis://localhost:6379'
  });
  
  client.on('error', (err) => console.log('Redis Client Error', err));
  
  await client.connect();
  
  // String operations
  await client.set('greeting', 'Hello Redis');
  const value = await client.get('greeting');
  console.log(value);  // 'Hello Redis'
  
  // Using hashes
  await client.hSet('settings', {
    'theme': 'dark',
    'notifications': 'true',
    'timezone': 'UTC'
  });
  
  const settings = await client.hGetAll('settings');
  console.log(settings);  // { theme: 'dark', notifications: 'true', timezone: 'UTC' }
  
  await client.disconnect();
}

main();
```

## 📊 Monitoring and Management

### Redis CLI Info

```bash
# Get server stats
redis-cli info

# Get memory stats
redis-cli info memory

# Monitor commands in real-time
redis-cli monitor
```

### Redis Benchmarking

```bash
# Run a simple benchmark
redis-benchmark -q -n 100000

# Run specific command benchmark
redis-benchmark -t set,get -n 100000 -q
```

### GUI Tools

- **Redis Insight**: Official Redis GUI tool - [Download](https://redis.com/redis-enterprise/redis-insight/)
- **RedisDesktopManager**: Cross-platform Redis GUI
- **Redis Commander**: Web-based Redis management tool

## 📚 Documentation

- [Official Redis Documentation](https://redis.io/docs/)
- [Redis Commands Reference](https://redis.io/commands)
- [Redis University Free Courses](https://university.redis.com/)

## 🔐 Security Best Practices

1. **Network Security**: Run Redis behind a firewall and bind it to localhost when possible
2. **Authentication**: Set a strong password using `requirepass` in the configuration
3. **Rename/Disable Commands**: Use `rename-command` to rename or disable dangerous commands
4. **TLS Encryption**: Enable TLS for production environments
5. **Regular Updates**: Keep Redis up to date with the latest security patches

## 🤝 Contributing

Redis is an open-source project and welcomes contributions from the community. Here's how you can contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

Redis is open-sourced software licensed under the [BSD-3-Clause license](https://opensource.org/licenses/BSD-3-Clause).

## 🌟 Support

- [Redis Community](https://redis.io/community)
- [Redis Forums](https://forum.redis.com)
- [Redis Discord Server](https://discord.gg/redis)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/redis)
