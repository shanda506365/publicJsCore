'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fetchMock = require('fetch-mock');

var _fetchMock2 = _interopRequireDefault(_fetchMock);

var _mockData = require('./mockData');

var _API = require('../lib/API');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_fetchMock2.default.mock(_API.API.login, _mockData.mData);
_fetchMock2.default.mock(_API.API.announcement, _mockData.optionsData);

exports.default = _fetchMock2.default;