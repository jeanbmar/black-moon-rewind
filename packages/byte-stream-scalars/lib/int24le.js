class Int24LE {
    static read(stream) {
        const value = stream.buffer.readIntLE(stream.offset, 3);
        stream.offset += 3;
        return value;
    }

    static write(stream, value) {
        stream.ensureCapacity(3);
        stream.buffer.writeIntLE(value, stream.offset, 3);
        stream.offset += 3;
    }
}

module.exports = Int24LE;
