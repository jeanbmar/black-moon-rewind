class UInt24BE {
    static read(stream) {
        const value = stream.buffer.readUIntBE(stream.offset, 3);
        stream.offset += 3;
        return value;
    }

    static write(stream, value) {
        stream.ensureCapacity(3);
        stream.buffer.writeUIntBE(value, stream.offset, 3);
        stream.offset += 3;
    }
}

module.exports = UInt24BE;
