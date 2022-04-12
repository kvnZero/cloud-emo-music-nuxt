import io from 'socket.io-client'
const socket = io('ws://127.0.0.1:9502/',  { transports: ["websocket"] })
socket.on('connect', data => {
    socket.emit('event', 'hello, hyperf', console.log);
    socket.emit('join-room', 'room1', console.log);
    setInterval(function () {
        socket.emit('say', '{"room":"room1", "message":"Hello Hyperf."}');
    }, 1000);
});
socket.on('event', console.log);
console.log(112313)
export default socket
