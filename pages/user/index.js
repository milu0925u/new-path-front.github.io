// import React, { useEffect } from 'react';
// import  io  from 'socket.io-client';

// export default function User() {

//     useEffect(() => {

//         const socket = io('http://localhost:3055');

//         socket.on('connection', () => {
//             console.log('Connected');
//         });

//         socket.on('message', (data) => {
//             console.log('Received message:', data);
//         });

//         socket.on('disconnect', () => {
//             console.log('Disconnected');
//         });

//         return () => {
//             socket.disconnect();
//         };
//     }, []);

//     return (
//         <button >Send Message</button>
//     );
// }
