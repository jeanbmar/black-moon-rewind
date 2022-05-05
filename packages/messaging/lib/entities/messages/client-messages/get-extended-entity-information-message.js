const Message = require('../../message');

class GetExtendedEntityInformationMessage extends Message {
  static service = 'world';
  static key = 'getExtendedEntityInformation';
}

module.exports = GetExtendedEntityInformationMessage;
