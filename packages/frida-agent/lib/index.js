const disableCrypto = () => {
    Interceptor.attach(ptr(0x50D640), {
        onLeave(value) {
            value.replace(0);
        },
    });
};

const hookPackets = (cb) => {
    Interceptor.attach(ptr(0x492e60), function() {
        const to = this.context.sp.add(4).readPointer();
        const len = to.add(20).readInt();
        const buf = to.add(16).readPointer();
        cb(buf.readByteArray(len), 1);
    });
};


const init = async () => {
    console.log('process', Process.id, Process.arch, Process.platform);
    disableCrypto();
    hookPackets((buf) => console.log(buf));
};

rpc.exports = { init };
