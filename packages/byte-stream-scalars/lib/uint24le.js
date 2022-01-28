class UInt24LE {
    static read(stream) {
        const value = stream.buffer.readUIntLE(stream.offset, 3);
        stream.offset += 3;
        return value;
    }

    static write(stream, value) {
        stream.ensureCapacity(3);
        stream.buffer.writeUIntLE(value, stream.offset, 3);
        stream.offset += 3;
    }
}

module.exports = UInt24LE;
