import React, { useState, useEffect } from 'react';
import './CustomChat.scss'
import 'react-chat-widget/lib/styles.css';
import { io } from "socket.io-client";
import Contact from './Contact/Contact';
import axios from '../../../../../4.leads-api/node_modules/axios';
import { useSelector } from 'react-redux';
import MessageContainer from './MessageContainer/MessageContainer'

let timeEvent;
const socket = io('http://localhost:2000')
const CustomChat = () => {
    const [selectedRoom, setSelectedRoom] = useState(0)
    const [notifications, setNotifications] = useState([])
    const [myUserID, setMyUserID] = useState(null)
    const [rooms, setRooms] = useState([])
    const { buisnessID, buisnessName } = useSelector(state => state.buisness)
    const user = useSelector(state => state.auth.user)
    useEffect(() => {
        if (buisnessID && user) {
            socket.on('notify-host', (roomObj, isAdded) => {
                setRooms((rooms) => {
                    if (isAdded)
                        return [...rooms, roomObj]
                    else {
                        const updatedRooms = [...rooms]
                        updatedRooms.map((room) => {
                            if (room._id === roomObj._id)
                                return room.isOnline = true
                        })
                        return [...rooms]
                    }
                })
                socket.emit('join-room', roomObj._id, message => {
                    console.log(message)
                    receiveNotification("Receive Nof Func", message)
                })
            })
            socket.on('refreshRooms', (rooms) => {
                console.log("Refresh Rooms")
                setRooms(rooms)
            })
            init()
        }
    }, [buisnessID, user])
    const [msg, setMsg] = useState('')
    const init = async () => {
        console.log('buisness: ', buisnessID)
        try {
            const req = await axios.post('http://localhost:8082/rooms/', { buisnessID }, {
                withCredentials: true
            })
            console.log(req.data)
            const { landingID, myID } = req.data
            initRooms(landingID, myID)
        }
        catch {
            try {
                const req = await axios.post('http://localhost:8082/createChat/', { buisnessID, buisnessName, name: user.firstName, email: user.email }, {
                    withCredentials: true
                })
                const { landingID, myID } = req.data
                initRooms(landingID, myID)
            } catch {
                console.log("Error in here too")
            }
        }
    }

    function GetFormattedDate() {
        var todayTime = new Date();
        var month = todayTime.getMonth() + 1;
        var day = todayTime.getDate();
        var year = todayTime.getFullYear();
        var hour = todayTime.getHours();
        var minutes = todayTime.getMinutes();
        return day + "/" + month + "/" + year + " " + hour + ":" + minutes;
    }


    const receiveNotification = (message) => {
        console.log("New Notification: ", message)
        const tempNotifications = [...notifications, message]
        console.log("Notifications:", tempNotifications)
        setNotifications(tempNotifications)
    }

    const initRooms = async (landingID, myID) => {
        setMyUserID(myID)
        console.log("LandingID", landingID)
        console.log("connecting")
        socket.on('connect', () => receiveNotification({ message: `You Connected with ${socket.id}`, date: new Date() }))
        console.log("Connected")
        socket.emit('join-room', landingID, message => {
            console.log(message)
            receiveNotification("Receive Nof Func", message)
        })
        socket.on('receive-msg', (roomID, message) => {
            console.log("RECEEEEECIVEVE")
            receiveMsg(roomID, message)
        })
        socket.emit('get-all-rooms', landingID, rooms => {
            setRooms(rooms)
        })
        socket.on('client-typing', (room, isTyping) => {
            console.log(isTyping, room)
            setRooms((rooms) => {
                console.log(rooms)
                let tempRooms = [...rooms]
                tempRooms.forEach(singleRoom => {
                    if (singleRoom._id === room) {
                        singleRoom.user.isTyping = isTyping
                    }
                })
                console.log(tempRooms)
                return tempRooms
            })
        })
    }

    const onChange = (e) => {
        clearTimeout(timeEvent);
        setMsg(e.target.value)
        socket.emit('typing', rooms[selectedRoom]._id, true, "crm", user.firstName)
        timeEvent = setTimeout(() => {
            console.log("sending Stop Typing Event")
            socket.emit('typing', rooms[selectedRoom]._id, false, "crm", user.firstName)
        }, 1000)
    }

    const receiveMsg = (roomID, message) => {
        console.log("In Receive Msg")
        console.log("RoomID:", roomID)
        console.log("msg:", message)
        setRooms((rooms) => {
            let tempRooms = [...rooms]
            tempRooms.forEach((singleRoom) => {
                if (singleRoom._id === roomID)
                    singleRoom.conversation.push(message)
            })
            return tempRooms
        }
        )
    }


    const sendMessage = event => {
        event.preventDefault()
        const receiver = rooms[selectedRoom].user
        console.log(receiver)
        console.log(rooms[selectedRoom]._id)
        console.log(myUserID)
        socket.emit('send-msg', msg, rooms[selectedRoom]._id, myUserID,
            receiver._id)
        let tempRooms = [...rooms]
        tempRooms[selectedRoom].conversation.push({ message: msg, from: myUserID, date: GetFormattedDate() })
        setMsg("")
    }
    return (

        <>
            {console.log(rooms)}
            <div className="flex-row flex-divider">
                <div className="chat centered">
                    {(rooms && rooms.length > 0) ?


                        <div className="chat-container">
                            <div className="chat-header">
                                <h1 className="centered full-height contact-header">{rooms[selectedRoom].user.firstName + "  "}
                                    {rooms[selectedRoom].user.isTyping && "Typing..."}</h1>
                            </div>
                            <div className="chat-body">
                                {rooms[selectedRoom].conversation.map((message, index) =>
                                    <MessageContainer key={index} date={message.date} txt={message.message} clas={`${message.from === myUserID ? "my" : "others"}`} />)}
                            </div>
                            <div className="chat-footer">
                                <form>
                                    <input
                                        type="text"
                                        id="message-input"
                                        value={msg}
                                        onChange={e => onChange(e)

                                        } />
                                    <button id="send-button" onClick={sendMessage}>
                                        Send
                                    </button>
                                </form>
                            </div>
                        </div>
                        :
                        <h1 className="centered">No Rooms Available</h1>
                    }
                </div>
                <div className="contacts">
                    <div className="contacts-header centered">
                        <h1>Contacts</h1>
                    </div>
                    <div className="contacts-list">
                        {rooms && rooms.map((room, index) =>
                            <Contact
                                key={index}
                                isSelected={index === selectedRoom}
                                setSelected={() => setSelectedRoom(index)}
                                name={room.user.firstName}
                                isLoggedIn={room.isOnline}
                                isTyping={room.user.isTyping}
                                lastTxt={room.conversation.length > 0 && room.conversation[room.conversation.length - 1].message}
                                date={room.conversation.length > 0 && room.conversation[room.conversation.length - 1].date}
                            />)}
                    </div>
                </div>
            </div>
        </>
    )

}

export default CustomChat