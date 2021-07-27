const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

var cors = require('cors')
app.use(cors());


var allClients = [];

app.get('/crm', (req, res) => {
    res.sendFile(__dirname + '/crm.html');
});

app.get('/lead', (req, res) => {
    res.sendFile(__dirname + '/lead.html');
});

app.get('/landingPage', (req, res) => {
    res.sendFile(__dirname + '/lead.html');
});

app.get('/crmChat', (req, res) => {
    res.sendFile(__dirname + '/crm.html');
});

io.on('connection', (socket) => {
  
   // var activeUsers=io.engine.clientsCount;
   //console.log(activeUsers);
    allClients.push(socket);

    socket.on('join crm', () => {
        socket.join('crm')
    });


    socket.on('admin message', ( room, msg ) => {
        io.in(room).emit('admin message',room,  msg) 
    });

    socket.on('lead message', (room, msg, isFirstMsg) => {

        if (isFirstMsg) {
            socket.join(room)
            io.in('crm').emit('new message', room, msg);
        }

        else {
            io.in(room).emit('lead message', room, msg) 
        }
    });


    socket.on('new lead', (leadId, msg) => {
        socket.join(leadId)
        io.in(leadId).emit('lead message',leadId, msg)
    });


    // socket.on('disconnect', function() {
    //     console.log('Got disconnect!');
    //     var i = allClients.indexOf(socket);
    //     allClients.splice(i, 1);
    //     io.emit('update clients', allClients)
    //  });
});

server.listen(9034, () => {
    console.log('listening on *:9034');
});