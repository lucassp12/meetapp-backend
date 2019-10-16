"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);

var _User = require('../app/models/User'); var _User2 = _interopRequireDefault(_User);
var _Meetup = require('../app/models/Meetup'); var _Meetup2 = _interopRequireDefault(_Meetup);
var _File = require('../app/models/File'); var _File2 = _interopRequireDefault(_File);
var _Subscription = require('../app/models/Subscription'); var _Subscription2 = _interopRequireDefault(_Subscription);

const models = [_User2.default, _File2.default, _Meetup2.default, _Subscription2.default];

class Database {
  constructor() {
    this.connection = new (0, _sequelize2.default)(_database2.default);
    this.init();
    this.associate();
  }

  init() {
    models.forEach(model => model.init(this.connection));
  }

  associate() {
    models.forEach(model => {
      if (model.associate) {
        model.associate(this.connection.models);
      }
    });
  }
}

exports. default = new Database();
