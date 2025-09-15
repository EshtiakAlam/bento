const setupio = function (io) {
  io.on('connection', (socket) => {
    console.log('🔌 User connected:', socket.id);

    // Join a specific chat room
    socket.on('join_chat', (chatId) => {
      const room = `chat_${chatId}`;
      socket.join(room);
      console.log(`Socket ${socket.id} joined room ${room}`);
    });

    // Handle sending a message
    socket.on('send_message', ({ chat_id, content }) => {
      const room = `chat_${chat_id}`;
      console.log(`Broadcasting message to ${room}:`, content);
      io.to(room).emit('receive_message', content);
      
      fetch(`http://chat-backend:3000/messages/${chat_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('Message saved:', data);
        })
        .catch((error) => {
          console.error('Error saving message:', error);
        });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};

module.exports = setupio;
