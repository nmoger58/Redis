const redis=require('redis');

const client=redis.createClient({
    host : "localhost",
    port : 6379
})
client.on('error',(err)=>{
    console.log("Error connecting to the redis:",err)
})
const startServer=async () => {
    try {
        await client.connect();
    console.log("Connected to the redis server")

    const trans=client.multi();
    trans.set('transKey-1',"val1");
    trans.set('transKey-2',"val2");
    trans.get('transKey-1')
    trans.get('transKey-2')
    const transData=await trans.exec();
    console.log(transData);
    } catch (error) {
        console.log("Redis Server Error:");
    }
    finally{
        await client.quit();
    }
}

startServer()