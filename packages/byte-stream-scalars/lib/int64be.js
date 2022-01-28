class Int64BE {
    static read(stream) {
        const value = stream.buffer.readBigInt64BE(stream.offset);
        stream.offset += 8;
        return Number(value);
    }

    static write(stream, value) {
        stream.ensureCapacity(8);
        stream.buffer.writeBigInt64BE(BigInt(value), stream.offset);
        stream.offset += 8;
    }
}

module.exports = Int64BE;
