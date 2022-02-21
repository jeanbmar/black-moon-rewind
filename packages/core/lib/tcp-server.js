const { Server } = require('net');

class TcpServer extends Server {
  constructor(options) {
    super(options);
    this.nextSocketSeq = 1;
    this.sockets = new Map();
    this.on('connection', this.handleConnection.bind(this));
  }

  nextSocketId() {
    const { nextSocketSeq: seq } = this;
    this.nextSocketSeq += seq;
    return seq;
  }

  handleConnection(socket) {
    // eslint-disable-next-line no-param-reassign
    socket.id = this.nextSocketId();
    socket.setNoDelay(true);
    this.sockets.set(socket.id, socket);
    socket.on('close', () => {
      this.sockets.delete(socket.id);
    });
  }
}

module.exports = TcpServer;
