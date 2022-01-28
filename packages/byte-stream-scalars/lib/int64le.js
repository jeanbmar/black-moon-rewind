class Int64LE {
    static read(stream) {
        const value = stream.buffer.readBigInt64LE(stream.offset);
        stream.offset += 8;
        return Number(value);
    }

    static write(stream, value) {
        stream.ensureCapacity(8);
        stream.buffer.writeBigInt64LE(BigInt(value), stream.offset);
        stream.offset += 8;
    }
}

module.exports = Int64LE;
