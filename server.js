const redis=require('redis');
const redisDataStructure = require('./data-structures');

// const client=redis.createClient({
//     host : 'localhost',
//     port : 6379
// })

// event listener

// client.on('error',  (err)=>{
//     console.log("redis client error :",err);
// })
const user={
    name : "Nagaraj",
    rollno : 12,
    username : "hero",
    age : 21
}
// const testRedisConnection=async () => {
//     try {
//         await client.connect()
//         console.log("Connected to the redis")
//         await client.set("name",user.name)
//         const extractKeyValue=await client.get('name')
//         console.log(extractKeyValue)
        
//         // to delete a value which is stored

//         const deleteCount = await client.del('name');
//         console.log(deleteCount)

//         // to increment and to decrement

//         // await client.set('number',100);
//         const incrementValue= await client.incr('number');
//         console.log(incrementValue);
//         const decrementValue=await client.decr('number');
//         console.log(decrementValue)
//     } catch (error) {
//         console.log(error)
//     }
//     finally{
//         await client.quit(); // to remove the open connection
//     }
// }

// testRedisConnection()

redisDataStructure();