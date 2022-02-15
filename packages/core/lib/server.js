const net = require('net');

class Server extends net.Server {
  constructor(options = {}) {
    super();
    this.nextSocketId = 1;
    this.sockets = new Map();
    this.transport = options.transport;
    this.on('connection', this.onConnection.bind(this));
  }

  generateUid() {
    const { nextSocketId: id } = this;
    this.nextSocketId += 1;
    return id;
  }

  onConnection(netSocket) {
    console.log('new client connection established');
    const socket = this.transport
      ? // eslint-disable-next-line new-cap,no-underscore-dangle
        new this.transport({ handle: netSocket._handle })
      : netSocket;
    socket.id = this.generateUid();
    this.sockets.set(socket.id, socket);
    socket.on('error', console.error);
    socket.on('message', async (message) => {
      this.emit('receive-from', message, socket.id);
    });
    socket.on('close', () => {
      this.sockets.delete(socket.id);
      this.emit('connection-closed', socket.id);
    });
  }

  sendTo(message, socketId) {
    const socket = this.sockets.get(socketId);
    if (socket) {
      socket.send(message);
    }
  }
}

module.exports = Server;
