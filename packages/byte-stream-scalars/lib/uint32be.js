class UInt32BE {
    static read(stream) {
        const value = stream.buffer.readUInt32BE(stream.offset);
        stream.offset += 4;
        return value;
    }

    static write(stream, value) {
        stream.ensureCapacity(4);
        stream.buffer.writeUInt32BE(value, stream.offset);
        stream.offset += 4;
    }
}

module.exports = UInt32BE;
