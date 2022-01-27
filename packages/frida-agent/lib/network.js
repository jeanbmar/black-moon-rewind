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

module.exports = {
    disableCrypto,
    enableTCP,
};
