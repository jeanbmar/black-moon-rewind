class Int16LE {
    static read(stream) {
        const value = stream.buffer.readInt16LE(stream.offset);
        stream.offset += 2;
        return value;
    }

    static write(stream, value) {
        stream.ensureCapacity(2);
        stream.buffer.writeInt16LE(value, stream.offset);
        stream.offset += 2;
    }
}

module.exports = Int16LE;
