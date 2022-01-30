class TcpSocket {
    constructor(socket) {
        this.socket = socket;
        this.isClosed = false;
        this.socket.on('data', this.onData.bind(this));
        this.socket.on('connect', () => { this.isClosed = false; });
        this.socket.on('close', () => { this.isClosed = true; });
        this.socket.on('error', () => { this.isClosed = true; });
    }

    get netSocket() {
        return this.socket;
    }

    connect(port, host) {
        this.socket.connect(port, host);
        return this;
    }

    on(event, callback) {
        this.socket.on(event, callback);
        return this;
    }

    once(event, callback) {
        this.socket.once(event, callback);
        return this;
    }

    end() {
        this.socket.end();
        return this;
    }

    sendMessage(message, callback) {
        if (this.isClosed) {
            callback && callback(new Error('socket is closed'));
            return;
        }
        this.handleSend(message, callback);
    }

    handleSend(message, callback) {
        throw new Error('handleSend must be implemented by subclass');
    }

    onData(data) {
        try {
            this.handleData(data);
        } catch (e) {
            this.socket.emit('error', e.message);
            this.socket.end();
        }
    }

    handleData(data) {
        throw new Error('handleData must be implemented by subclass');
    }

    emitMessage(message) {
        this.socket.emit('message', message);
    }
}

module.exports = TcpSocket;
