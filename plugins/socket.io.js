import io from 'socket.io-client'
const socket = io('ws://127.0.0.1:9502/',  { transports: ["websocket"] })

socket.on('connect', data => {
    console.log(data)
    socket.emit('event', 'hello, hyperf', console.log);
});
socket.on('event', console.log);
export default socket