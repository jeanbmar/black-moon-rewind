class Entity {
    static read(byteStream, options) {
        const entity = new this();
        entity.read(byteStream, options);
        return entity;
    }

    read(byteStream, options) {
        throw new Error('read method is not implemented by superclass');
    }

    static write(byteStream, entityLike, options) {
        this.prototype.write.call(entityLike, byteStream, options);
    }

    write(byteStream, options) {
        throw new Error('write method is not implemented by superclass');
    }
}

module.exports = Entity;
