class Int24BE {
    static read(stream) {
        const value = stream.buffer.readIntBE(stream.offset, 3);
        stream.offset += 3;
        return value;
    }

    static write(stream, value) {
        stream.ensureCapacity(3);
        stream.buffer.writeIntBE(value, stream.offset, 3);
        stream.offset += 3;
    }
}

module.exports = Int24BE;
