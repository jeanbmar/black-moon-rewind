const { Server } = require('net');
const { pipeline } = require('stream');
const { v4: uuidv4 } = require('uuid');

class TcpServer extends Server {
  constructor(options = {}) {
    const { name = uuidv4(), ...rest } = options;
    super(rest);
    this.name = name;
    this.middlewares = [];
    this.seq = 1;
    this.on('connection', this.handleConnection.bind(this));
  }

  nextClientId() {
    const uid = `${this.name}-${this.seq}`;
    this.seq += 1;
    return uid;
  }

  handleConnection(socket) {
    // eslint-disable-next-line no-param-reassign
    socket.clientId = this.nextClientId();
    socket.setNoDelay(true);
    this.emit('client', socket);
  }

  use(middleware) {
    this.middlewares.push(middleware);
    return this;
  }

  pipe(partner) {
    this.on('client', (client) => {
      pipeline(
        client,
        ...this.middlewares.map((middleware) => middleware()),
        partner.getWriteStream(client.clientId),
        (error) => {
          if (error) {
            this.emit('error', error);
          }
        }
      );
    });
  }

  // eslint-disable-next-line class-methods-use-this
  getWriteStream(client) {
    return client;
  }
}

module.exports = TcpServer;
