const net = require('net');
const { Transform } = require('stream');
const MicroService = require('./micro-service');
const { PacketConsumer, PacketPublisher } = require('../messaging');

class Gateway extends MicroService {
  /*constructor() {
    super();
    this.middlewares = [PacketPublisher, PacketConsumer];
    this.server = net.createServer();
    this.server.on('connection', this.handleConnection.bind(this));
  }

  handleConnection(socket) {
    const client = {}; // todo uid



    pipeline
    this.middlewares.reduce(
      (pipeline, middleware) => stream.pipe(new middleware(request, client)),
      socket
    );

    socket
      .pipe(new PacketReader())
      .pipe(new PacketPublisher(channel, { replyTo }));
  }

  listen(options, callback) {}
*/
}
module.exports = Gateway;
