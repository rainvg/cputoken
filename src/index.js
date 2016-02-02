'use strict';

var child_process = require('child_process');

var functions = require('./functions.js');

var token = function(message, bits)
{
  return new Promise(function(resolve)
  {
    var worker = child_process.fork(__dirname + '/cpuworker.js');
    worker.send({message: message, bits: bits});
      worker.on('message', function(message)
      {
        resolve(message.token);
      });
  });
};

var check = function(message, token, bits)
{
  return functions.bitcmp(functions.sha256(message), functions.sha256(new Buffer(token, 'hex')), bits);
};

module.exports = {
  token: token,
  check: check
};
