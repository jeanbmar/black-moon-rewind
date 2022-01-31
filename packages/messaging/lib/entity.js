class Entity {
    static read(byteStream, options) {
        const entity = new this();
        entity.read(byteStream, options);
        return entity;
    }

    read(byteStream, options) {}

    static write(byteStream, entityLike, options) {
        this.prototype.write.call(entityLike, byteStream, options);
    }

    write(byteStream, options) {}
}

module.exports = Entity;
