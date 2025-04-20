const redis=require('redis');

const client=redis.createClient({
    host : "localhost",
    port : 6379
})
client.on('error',(err)=>{
    console.log("Error connecting to the redis :"+err)
})
const redisStart=async () => {
    try {
        await client.connect();
    console.log("Connected to the redis server")
    const subscriber=client.duplicate();
    await subscriber.connect();
    await subscriber.subscribe('channel',(message,channel)=>{
        console.log("Received message from the publisher : ",channel," with data :"+message)
    })
    client.publish('channel',"Some data to the subscriber");
    client.publish('channel',"Second data to the subscriber")
    
    await subscriber.unsubscribe("channel")
    await subscriber.quit();
    } catch (error) {
        console.log("Redis server error :"+error)
    }
    finally{
        await client.quit();
    }
}
redisStart();