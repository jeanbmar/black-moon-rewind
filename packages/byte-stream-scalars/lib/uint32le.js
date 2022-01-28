class UInt32LE {
    static read(stream) {
        const value = stream.buffer.readUInt32LE(stream.offset);
        stream.offset += 4;
        return value;
    }

    static write(stream, value) {
        stream.ensureCapacity(4);
        stream.buffer.writeUInt32LE(value, stream.offset);
        stream.offset += 4;
    }
}

module.exports = UInt32LE;
