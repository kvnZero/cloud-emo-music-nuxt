import io from 'socket.io-client'
const socket = io( process.env.socketUrl + '/',  { transports: ["websocket"] })
socket.on('connect', data => {
    socket.emit('join-room', 'main');
});
export default socket
