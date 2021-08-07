const express = require('express')
const app = express()
var cors = require('cors');
const routes = require('./routes')
// var redis = require('redis');
// var subscriber = redis.createClient();

// subscriber.on("message", (channel, message) => {
//     console.log("Recieved ", message, " from channel: ", channel)
// });
// subscriber.subscribe('notification');

let port = 12


app.use(cors({ credentials: true, origin: 'http://localhost:3000', exposedHeaders: ["set-cookie"] }));

app.options('*', cors());
//app.use('/api/v1', routes)
//app.use('/broadcast', redisRoutes)

app.get('/', (req, res) => {
    res.send('hello there');
});


app.listen(port
    , () => {
        console.log('The Server is listening on port: ', port)
    }
)