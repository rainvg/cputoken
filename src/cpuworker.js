var functions = require('./functions.js');

process.on('message', function(message)
{
  process.send({token: functions.search(message.message, message.bits)});
  process.disconnect();
});
