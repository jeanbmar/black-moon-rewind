class Entity {
  constructor(properties) {
    Object.assign(this, properties);
  }

  static read(byteStream, options) {
    const entity = new this();
    entity.read(byteStream, options);
    return entity;
  }

  // eslint-disable-next-line class-methods-use-this
  read() {}

  static write(byteStream, entityLike, options) {
    this.prototype.write.call(entityLike, byteStream, options);
  }

  // eslint-disable-next-line class-methods-use-this
  write() {}
}

module.exports = Entity;
