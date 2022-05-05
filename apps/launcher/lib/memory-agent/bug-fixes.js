const fixDeleteChatterChannels = () => {
  const recurDeleteKey = new NativeFunction(
    ptr(0x520790),
    'int',
    ['pointer', 'pointer'],
    'thiscall'
  );
  Interceptor.attach(ptr(0x421079), function onEnter() {
    recurDeleteKey(this.context.ecx, ptr(0x59b18c));
  });
};

module.exports = {
  fixDeleteChatterChannels,
};
