import { request } from 'express';
import { Server  } from 'socket.io';
import { chatController } from '../controllers';

export const startSocket = (io:Server) => {
io.on("connection", (socket) => {

  sendMessages(socket);

  socket.on("new message", (newMessage) => {
    saveMessage(newMessage);
  });
});

const sendMessages = async (socket:any) => {
  const allMessage = await chatController.getAll();
  socket.emit("all message", allMessage);
};

const saveMessage = async (message: {user:string, text:string}) => {
  await chatController.createMensaje(message);
  const allMessage = await chatController.getAll();
  io.sockets.emit("all message", allMessage);
};
}

