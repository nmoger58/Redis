const redis=require('redis');

const client=redis.createClient({
    host : "localhost",
    port : 6379
})
client.on('error',(err)=>[
    console.log("Error connecting to the redis")
])
const redisDataStructure=async()=>{
  try {
    await client.connect();
    console.log("Connected to the redis")
    await client.set('name',"vishwas");
  let fetchddata=await client.get('name');
  console.log(fetchddata);

  await client.mSet(["user:username","harish","user:email","hari@gmail.com","user:age","21"]);
  fetchddata=await client.mGet(["user:username","user:email","user:age"])
  console.log(fetchddata)

  // lists -> LPUSH,RPUSH,LRANGE,LPOP,RPOP
  
  } catch (error) {
    console.log("Redis server error :",error);
  }
  finally{
    await client.quit()
  }
}

// module.exports=redisDataStructure;
redisDataStructure();


// types of data structures allowed 
// set , get -> for single key value pairs
// mSet,mGet -> for multiple key value pairs