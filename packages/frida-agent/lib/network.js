const connect = new NativeFunction(Module.findExportByName(null, 'connect'), 'int', ['int', 'pointer', 'int'], 'stdcall');

const disableCrypto = () => {
    Interceptor.attach(ptr(0x50D640), {
        onLeave(value) {
            value.replace(0);
        },
    });
}

const enableTCP = () => {
    Interceptor.attach(Module.findExportByName(null, 'socket'), function(args) {
        args[1] = ptr(1); // SOCK_STREAM
    });
    Interceptor.replace(ptr(0x51b72a), new NativeCallback((fd, addr, addrLen) => {
        addr.add(2).writeU16(ptr(0x5AC0A0).add(2).readU16()); // port
        addr.add(4).writeU32(ptr(0x5AC0A4).readU32()); // ip
        return connect(fd, addr, addrLen);
    }, 'int', ['int', 'pointer', 'int'], 'stdcall'));
};

const disableSynAck = () => {
    Memory.protect(ptr(0x49541D), 4, 'rwx');
    Memory.protect(ptr(0x495423), 4, 'rwx');
    ptr(0x49541D).writeByteArray([0xC7, 0x01, 0x00, 0x00]);
    ptr(0x495423).writeByteArray([0xC7, 0x02, 0x00, 0x00]);
    Memory.protect(ptr(0x495431), 4, 'rwx');
    Memory.protect(ptr(0x495437), 4, 'rwx');
    ptr(0x495431).writeByteArray([0xC7, 0x00, 0x00, 0x00]);
    ptr(0x495437).writeByteArray([0xC7, 0x01, 0x00, 0x00]);
    Memory.protect(ptr(0x495459), 4, 'rwx');
    Memory.protect(ptr(0x49545F), 4, 'rwx');
    ptr(0x495459).writeByteArray([0xC7, 0x01, 0x00, 0x00]);
    ptr(0x49545F).writeByteArray([0xC7, 0x02, 0x00, 0x00]);
};

module.exports = {
    disableCrypto,
    disableSynAck,
    enableTCP,
};
