const { patch } = require('./memory');

const WIDTH = 800;
const HEIGHT = 600;

const upscaleU16 = (address, cb) => {
  Memory.protect(address, 2, 'rwx');
  const value = address.readU16();
  if (typeof cb === 'function') {
    address.writeU16(cb(value));
  } else {
    address.writeU16(cb * value);
  }
};

const upscaleWindow = (factor) => {
  upscaleU16(ptr(0x4f4cba).add(1), factor);
  upscaleU16(ptr(0x4f4cbf).add(1), factor);
  upscaleU16(ptr(0x4f4d65).add(3), factor);
  upscaleU16(ptr(0x4f4d6c).add(3), factor);
};

const upscaleBoxUI = (factor) => {
  // game box ui can never be full screen anymore
  patch(ptr(0x4065fb), [0xb8, 0x00]);

  // main area when box ui is visible (nullified impact)
  upscaleU16(ptr(0x405cce).add(1), () => 0);
  upscaleU16(ptr(0x405cd5).add(1), () => WIDTH * factor);
  upscaleU16(ptr(0x405ce0).add(1), () => WIDTH * factor);
  upscaleU16(ptr(0x405ce5).add(1), () => HEIGHT * factor);

  // main area when box ui is not visible
  upscaleU16(ptr(0x405e80).add(1), factor);
  upscaleU16(ptr(0x405e89).add(1), () => HEIGHT * factor);

  // sub_405D10, main area with visible ui
  upscaleU16(ptr(0x405d88).add(1), factor);
  upscaleU16(ptr(0x405d91).add(1), () => HEIGHT * factor);

  // half screen box ui
  // upscaleU16(ptr(0x452092).add(1), factor); // do not scale as we stick to left
  upscaleU16(ptr(0x452099).add(1), (value) => WIDTH * factor - (WIDTH - value));
  upscaleU16(ptr(0x4520a0).add(1), factor); // scale for close button
  // upscaleU16(ptr(0x4520B4).add(1), factor); // do not scale as we stick to top
};

const upscaleLight = (factor) => {
  // commented scaling apply to 1024 and 2048 values, they may be unrelated
  // upscaleU16(ptr(0x45f97b).add(2), factor);
  // upscaleU16(ptr(0x45F9BF).add(2), factor);
  // upscaleU16(ptr(0x45F9C7).add(2), factor);
  // upscaleU16(ptr(0x45fa21).add(2), factor);
  upscaleU16(ptr(0x45fa2c).add(1), factor);
  upscaleU16(ptr(0x45fa38).add(1), factor);
  upscaleU16(ptr(0x45fa3f).add(3), factor);
  upscaleU16(ptr(0x49a03c).add(1), factor);
  upscaleU16(ptr(0x49a046).add(2), factor);
  // upscaleU16(ptr(0x49A04e).add(1), factor);
  // upscaleU16(ptr(0x49A057).add(2), factor);
};

const upscaleTaskBarUI = (factor) => {
  upscaleU16(
    ptr(0x5136aa).add(1),
    (value) => HEIGHT * factor - (HEIGHT - value)
  );
  upscaleU16(ptr(0x5136b2).add(1), factor);
  upscaleU16(ptr(0x5136ba).add(1), factor);
};

const upscaleStatusUI = (factor) => {
  upscaleU16(
    ptr(0x40e5c5).add(1),
    (value) => HEIGHT * factor - (HEIGHT - value)
  );
  upscaleU16(
    ptr(0x40e79d).add(1),
    (value) => HEIGHT * factor - (HEIGHT - value)
  );
};

const upscaleUIScaling = (factor) => {
  upscaleU16(ptr(0x455bd3).add(3), factor);
  upscaleU16(ptr(0x455bdc).add(3), factor);
};

const upscaleChatUI = (factor) => {
  upscaleU16(
    ptr(0x4ff7d9).add(3),
    (value) => HEIGHT * factor - (HEIGHT - value)
  );
  upscaleU16(
    ptr(0x4ff7e2).add(3),
    (value) => HEIGHT * factor - (HEIGHT - value)
  );
};

const upscaleMapUI = (factor) => {
  upscaleU16(ptr(0x437c6d).add(1), (value) => WIDTH * factor - (WIDTH - value));
  upscaleU16(
    ptr(0x437c76).add(1),
    (value) => HEIGHT * factor - (HEIGHT - value) + 30
  ); // remove bottom space
  upscaleU16(ptr(0x437c7e).add(1), factor);
  upscaleU16(
    ptr(0x437c86).add(1),
    () => ptr(0x437c76).add(1).readU16() + (581 - 411)
  ); // scale for map button
};

const upscaleQuickslotUI = (factor) => {
  // upscaleU16(ptr(0x40C424).add(6), factor); // no scaling, keep it mid screen
  upscaleU16(ptr(0x40c42e).add(6), () => HEIGHT * factor * 0.8);
};

const upscaleSplashScreen = (factor) => {
  Interceptor.attach(ptr(0x40b04e), function onEnter() {
    this.context.esi.writeInt((WIDTH * (factor - 1)) / 2);
    this.context.esi.add(4).writeInt((HEIGHT * (factor - 1)) / 2);
  });
  Interceptor.attach(ptr(0x40b256), function onEnter() {
    this.context.edi.writeInt((WIDTH * (factor - 1)) / 2);
    this.context.edi.add(4).writeInt((HEIGHT * (factor - 1)) / 2);
  });
  upscaleU16(ptr(0x40b04e).add(1), factor);
  upscaleU16(ptr(0x40b05c).add(1), factor);
  upscaleU16(ptr(0x40b256).add(1), factor);
  upscaleU16(ptr(0x40b25e).add(1), factor);
};

const upscale = (factor = 1.8) => {
  upscaleWindow(factor);
  upscaleBoxUI(factor);
  upscaleLight(factor);
  upscaleUIScaling(factor);
  upscaleStatusUI(factor);
  upscaleChatUI(factor);
  upscaleMapUI(factor);
  upscaleTaskBarUI(factor);
  upscaleSplashScreen(factor);
  upscaleQuickslotUI(factor);
};

module.exports = {
  upscale,
};
