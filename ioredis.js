const Redis=require('ioredis');

// this is the redis client for the nodejs
// this contains a lot of features and is more powerful than the redis client
// this will give the automatic pipeline
const redis=new Redis();

const demo=async () => {
    try {
        await redis.set('key','value');
        console.log(await redis.get('key'))
    } catch (error) {
        console.log("Something went wrong :",error)
    }
    finally{
        redis.quit();
    }
}

demo();