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
    var currentRoomId;
    allClients.push(socket);
    socket.on('join crm', () => {
        socket.join('crm')
    });

    socket.on('welcome message', (data) => {
        console.log(data.room);
        console.log(data.msg);
        socket.join(data.room)
        io.in(data.room).emit('welcome message', data.msg)
    });

    socket.on('connect crm to all rooms', ( data ) => {
        data.forEach(element => {
            socket.join(element.room)
            const clients = io.sockets.adapter.rooms.get(element.room);
            if (clients.size > 1) {
                io.emit('lead come back', element.room)
            }
            else {
                socket.leave(element.room)
            }
        });
    });

    socket.on('admin message', ( room, msg ) => {
        io.in(room).emit('admin message',room,  msg) 
    });

    socket.on('lead back', (room) => {
        console.log('sdfsdsdf');
        currentRoomId = room;
        socket.join(room)
        io.emit('lead come back', currentRoomId)
        io.in('crm').emit('new message', room, "", true);
        
    });

    socket.on('lead message', (room, msg, isFirstMsg) => {
        //lead is already exist
        // if (flag) {
        //     currentRoomId = room;
        //     socket.join(room)
        //     io.emit('lead come back', currentRoomId)
        //     io.in('crm').emit('new message', room, msg, flag);
        // }

        // else {
            currentRoomId = room;
            //first msg of lead
            if (isFirstMsg) {
                socket.join(room)
                io.in('crm').emit('new message', room, msg);
            }
            else {
                io.in(room).emit('lead message', room, msg) 
            }
        // }
    });


    socket.on('new lead', (leadId, msg, flag) => {
        socket.join(leadId)
        if (!flag) {
            io.in(leadId).emit('lead message',leadId, msg)
        }
    });

    socket.on('lead typing', (room)=> {
        io.emit('lead typing', room);
    })
    
    socket.on('admin typing', ()=> {
      
    })



    socket.on('disconnect', function() {
       io.emit('disco', currentRoomId)
    });

});

server.listen(9034, () => {
    console.log('listening on *:9034');
});