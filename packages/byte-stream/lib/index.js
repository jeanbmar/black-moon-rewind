const { Buffer } = require('buffer');

const DEFAULT_SIZE = 128;
const DEFAULT_FIXED_GROWTH_SIZE = 64;
const DEFAULT_DYNAMIC_GROWTH_FACTOR = 0.5;

class ByteStream {
    constructor(buffer, options = {}) {
        const {
            dynamic = false,
            growth = dynamic ? DEFAULT_DYNAMIC_GROWTH_FACTOR : DEFAULT_FIXED_GROWTH_SIZE,
            defaultSize = DEFAULT_SIZE,
        } = options;
        this.dynamic = dynamic;
        this.growth = growth;
        if (buffer) {
            this.buffer = buffer;
            this.byteLength = buffer.length;
        } else {
            this.buffer = Buffer.allocUnsafe(defaultSize);
            this.byteLength = 0;
        }
        this.offset = 0;
    }

    truncate() {
        this.buffer = this.buffer.slice(0, this.byteLength);
        return this.buffer;
    }

    get capacity() {
        return this.buffer.length;
    }

    ensureCapacity(size) {
        const overflow = this.offset + size - this.capacity;
        if (overflow > 0) {
            const growth = this.dynamic ? Math.ceil(this.capacity * this.growth) : this.growth;
            this.buffer = Buffer.concat([this.buffer, Buffer.allocUnsafe(Math.max(overflow, growth))]);
        }
    }

    isAtEnd() {
        return this.byteLength <= this.offset;
    }
}

module.exports = ByteStream;
