const setupio = function (io) {
  io.on('connection', (socket) => {
    console.log('🔌 User connected:', socket.id);

    // Join a specific chat room
    socket.on('join_chat', (chatId) => {
      const room = `chat_${chatId}`;
      socket.join(room);
      console.log(`📥 Socket ${socket.id} joined room ${room}`);
    });

    // Handle sending a message
    socket.on('send_message', ({ chat_id, message }) => {
      const room = `chat_${chat_id}`;
      console.log(`📤 Broadcasting message to ${room}:`, message);
      io.to(room).emit('receive_message', message);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('❌ User disconnected:', socket.id);
    });
  });
};

module.exports = setupio;
