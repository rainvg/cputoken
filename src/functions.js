var crypto = require('crypto');
var securerandom = require('secure-random');
var xor = require('bitwise-xor');

var __bitmask = [];

function __setup_bitmask()
{
  var cursor = 31;

  var mask = new Buffer(32).fill(0);
  var map = {0x00: 0x01, 0x01: 0x03, 0x03: 0x07, 0x07: 0x0f, 0x0f: 0x1f, 0x1f: 0x3f, 0x3f: 0x7f, 0x7f: 0xff};

  for(var i = 0; i < 257; i++)
  {
    __bitmask.push(new Buffer(mask));
    mask[cursor] = map[mask[cursor]];
    if(mask[cursor] === 0xff) cursor--;
  }

  __bitmask = __bitmask.reverse();
}

__setup_bitmask();

function bitcmp(reference, digest, bits)
{
  var cmp = xor(reference, digest);
  return Buffer.compare(cmp, __bitmask[bits]) <= 0;
}

function sha256(data)
{
  var sha256 = crypto.createHash('sha256');
  sha256.update(data);
  return sha256.digest();
}

function search(message, bits)
{
  var reference = sha256(message);

  while(true)
  {
    var token = securerandom.randomBuffer(32);
    if(bitcmp(reference, sha256(token), bits))
      return token.toString('hex');
  }
}

module.exports = {
  bitcmp: bitcmp,
  sha256: sha256,
  search: search
};
