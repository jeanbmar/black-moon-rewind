const { EquipmentDataMessage } = require('@black-moon-rewind/messaging');

module.exports = function listener(message, socket) {
  const equipmentData = new EquipmentDataMessage();
  equipmentData.items[1] = {
    id: 0x00100092,
    b: 0x00017ebf,
    c: -1,
    d: 0x0001,
    e: 0x4f41,
    f: 0x00001b89,
    g: 0x00001b8a,
  };
  equipmentData.items[2] = {
    id: 0x00100093,
    b: 0x0003110a,
    c: 0,
    d: 0x0001,
    e: 0x5100,
    f: 0x0000c70e,
    g: 0x0000c70f,
  };
  equipmentData.items[3] = {
    id: 0x00100094,
    b: 0x000216e8,
    c: 1,
    d: 0x0001,
    e: 0x6927,
    f: 0x0000240a,
    g: 0x0000240b,
  };
  socket.send(equipmentData);
};
