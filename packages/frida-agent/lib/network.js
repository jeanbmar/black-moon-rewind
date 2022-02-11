const connect = new NativeFunction(
  Module.findExportByName(null, 'connect'),
  'int',
  ['int', 'pointer', 'int'],
  'stdcall'
);

const disableCrypto = () => {
  Interceptor.attach(ptr(0x50d640), {
    onLeave(value) {
      value.replace(0);
    },
  });
};

const enableTCP = () => {
  Interceptor.attach(Module.findExportByName(null, 'socket'), (args) => {
    args[1] = ptr(1); // SOCK_STREAM
  });
  Interceptor.replace(
    ptr(0x51b72a),
    new NativeCallback(
      (fd, addr, addrLen) => {
        addr.add(2).writeU16(ptr(0x5ac0a0).add(2).readU16()); // port
        addr.add(4).writeU32(ptr(0x5ac0a4).readU32()); // ip
        return connect(fd, addr, addrLen);
      },
      'int',
      ['int', 'pointer', 'int'],
      'stdcall'
    )
  );
};

const disableSynAck = () => {
  Memory.protect(ptr(0x49541d), 4, 'rwx');
  Memory.protect(ptr(0x495423), 4, 'rwx');
  ptr(0x49541d).writeByteArray([0xc7, 0x01, 0x00, 0x00]);
  ptr(0x495423).writeByteArray([0xc7, 0x02, 0x00, 0x00]);
  Memory.protect(ptr(0x495431), 4, 'rwx');
  Memory.protect(ptr(0x495437), 4, 'rwx');
  ptr(0x495431).writeByteArray([0xc7, 0x00, 0x00, 0x00]);
  ptr(0x495437).writeByteArray([0xc7, 0x01, 0x00, 0x00]);
  Memory.protect(ptr(0x495459), 4, 'rwx');
  Memory.protect(ptr(0x49545f), 4, 'rwx');
  ptr(0x495459).writeByteArray([0xc7, 0x01, 0x00, 0x00]);
  ptr(0x49545f).writeByteArray([0xc7, 0x02, 0x00, 0x00]);
};

module.exports = {
  disableCrypto,
  disableSynAck,
  enableTCP,
};
