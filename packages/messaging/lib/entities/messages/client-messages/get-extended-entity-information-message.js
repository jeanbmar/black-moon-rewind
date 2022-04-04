const Message = require('../../message');

class GetExtendedEntityInformationMessage extends Message {
  static key = 'world.getExtendedEntityInformation';
}

module.exports = GetExtendedEntityInformationMessage;
