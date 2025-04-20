const redis = require("redis");

const client = redis.createClient({
  host: "localhost",
  port: 6379,
});
client.on("error", (err) => [console.log("Error connecting to the redis")]);
const redisDataStructure = async () => {
  try {
    await client.connect();
    console.log("Connected to the redis");
    await client.set("name", "vishwas"); // single add operations
    let fetchddata = await client.get("name");
    console.log(fetchddata);

    await client.mSet([
      "user:username",
      "harish",
      "user:email",
      "hari@gmail.com",
      "user:age",
      "21",
    ]); // multiple data adding
    fetchddata = await client.mGet(["user:username", "user:email", "user:age"]);
    console.log(fetchddata);

    // lists -> LPUSH,RPUSH,LRANGE,LPOP,RPOP
    //   await client.lPush("notes",["note-1","note-2","note-3"]);
    let fetchNotes = await client.lRange("notes", 0, -1); // take all the data from left to right
    // 0,-1 to fetch all the notes
    console.log(fetchNotes);
    //   await client.del('notes');
    fetchNotes = await client.lPop("notes"); // remove the left most element from the set
    console.log(fetchNotes);

    // set operations on the data
    // sets=> SADD SISMEMBER SREM SMEMBERS

    // await client.sAdd('user',["john","doe","forger"]);
    let setData = await client.sMembers("user");
    console.log(setData);

    await client.sRem("user", "john");
    setData = await client.sMembers("user");

    const value = await client.sIsMember("user", "doe");
    console.log(value);

    // sorted sets
    // zrange zadd zrank zrem
    await client.zAdd("sortedUser", [
      {
        score: 1,
        value: "harsh",
      },
      {
        score: 0,
        value: "haran",
      },
      {
        score: 10,
        value: "kiran",
      },
      {
        score :11,  // here the last executed score will be taken to consideration
        value : "kiran"
      }
    ]);
    
    let sortedSets = await client.zRange("sortedUser", 0, -1);
    console.log(sortedSets);
    // always should use score and value inside the ZADD function
    await client.zRem("sortedUser","vishwa");
    sortedSets =await client.zRange("sortedUser",0,-1)

    sortedSets=await client.zRangeWithScores("sortedUser",0,-1);
    console.log(sortedSets)
    sortedSets = await client.zRank("sortedUser","haran")
    // this will return the index of the value in the ascending order 
    console.log(sortedSets)

    // normal data with the object being passed 
    await client.set("data",JSON.stringify({
      "name": "vishwas",
      "age":"21",
      "isMarried":"true"
    }))
    fetchddata=await client.get("data")
    console.log(JSON.parse(fetchddata))

    // the above can be avoided with the help of the hashes
    // hashes => hGet,hSet,hGetAll ,hDel

    await client.hSet("hashedUser",{
      name : "haran",
      age : "21",
      isHero : "true"
    })
    fetchddata=await client.hGet("hashedUser","age")
    console.log(fetchddata)
    // to get the details of all the field 
    fetchddata=await client.hGetAll("hashedUser");
    console.log(fetchddata)

    // to delete some of the properties
    // fetchddata=await client.hDel('hashedUser',"name")
    console.log(fetchddata)

  } catch (error) {
    console.log("Redis server error :", error);
  } finally {
    await client.quit();
  }
};

// module.exports=redisDataStructure;
redisDataStructure();

// types of data structures allowed
// set , get -> for single key value pairs
// mSet,mGet -> for multiple key value pairs
