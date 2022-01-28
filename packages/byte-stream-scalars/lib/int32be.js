class Int32BE {
    static read(stream) {
        const value = stream.buffer.readInt32BE(stream.offset);
        stream.offset += 4;
        return value;
    }

    static write(stream, value) {
        stream.ensureCapacity(4);
        stream.buffer.writeInt32BE(value, stream.offset);
        stream.offset += 4;
    }
}

module.exports = Int32BE;
