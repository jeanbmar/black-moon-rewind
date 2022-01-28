class UInt8 {
    static read(stream) {
        const value = stream.buffer.readUInt8(stream.offset);
        stream.offset += 1;
        return value;
    }

    static write(stream, value) {
        stream.ensureCapacity(1);
        stream.buffer.writeUInt8(value, stream.offset);
        stream.offset += 1;
    }
}

module.exports = UInt8;
