const EventEmitter = require('events');
const got = require('got');
const tar = require('tar');

class Download extends EventEmitter {
    constructor(options = {}) {
        super();
        this.url = options.url;
        this.path = options.path;
    }

    async done() {
        return new Promise((resolve, reject) => {
            const downloadStream = got.stream(this.url);
            downloadStream.on('error', reject);
            downloadStream.on('downloadProgress', (p) => this.emit('progress', p));
            const writeStream = downloadStream.pipe(tar.extract({ cwd: this.path }));
            writeStream.on('error', reject);
            writeStream.on('finish', resolve);
        });
    }
}

module.exports = Download;
