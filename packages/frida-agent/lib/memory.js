const patch = (address, bytes) => {
  Memory.protect(address, bytes.length, 'rwx');
  address.writeByteArray(bytes);
};

module.exports = {
  patch,
};
