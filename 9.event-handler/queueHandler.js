import redis from "redis"


const subscriber = redis.createClient();
const client = redis.createClient();
let count = 0;


subscriber.on("message", function (channel, message) {
  client.set(count, message, function(err, reply) {
    console.log(count);
    count++
    console.log(reply); // OK
  });

  client.get(count, function(err, reply) {
    console.log(reply); // ReactJS
  });

});

subscriber.subscribe('events')