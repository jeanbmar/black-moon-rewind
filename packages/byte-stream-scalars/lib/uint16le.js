class UInt16LE {
    static read(stream) {
        const value = stream.buffer.readUInt16LE(stream.offset);
        stream.offset += 2;
        return value;
    }

    static write(stream, value) {
        stream.ensureCapacity(2);
        stream.buffer.writeUInt16LE(value, stream.offset);
        stream.offset += 2;
    }
}

module.exports = UInt16LE;
