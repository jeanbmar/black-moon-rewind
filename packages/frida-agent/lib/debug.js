const hookPackets = (cb) => {
    Interceptor.attach(ptr(0x492e60), function() {
        const to = this.context.sp.add(4).readPointer();
        const len = to.add(20).readInt();
        const buf = to.add(16).readPointer();
        cb(buf.readByteArray(len), 1);
    });
    Interceptor.attach(ptr(0x492CC0), {
        onLeave(value) {
            if (!value.isNull()) {
                const len = value.add(20).readInt();
                const buf = value.add(16).readPointer();
                cb(buf.readByteArray(len), 2);
            }
        },
    });
};

const hookDebugLog = (cb) => {
    Interceptor.attach(ptr(0x475730), function() {
        cb(this.context.sp.add(4).readPointer().readUtf8String());
    });
};

module.exports = {
    hookPackets,
    hookDebugLog,
};
