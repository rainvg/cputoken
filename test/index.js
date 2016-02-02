'use strict';

var cputoken = require('../src/index.js');
var assert = require('assert');

describe('cputoken', function()
{
  this.timeout(60000);

  it('should find a 16-bit cputoken for a test string.', function(done)
  {
    cputoken.token('my test string', 16).then(function()
    {
      done();
    });
  });

  it('should check a 16-bit cputoken generated for a test string.', function(done)
  {
    cputoken.token('my test string', 16).then(function(token)
    {
      if(cputoken.check('my test string', token, 16))
        done();
      else
        done(new Error('Check test failed.'));
    });
  });

  it('should detect an invalid 16-bit cputoken.', function()
  {
    assert(!cputoken.check('my test string', '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef', 16));
  });
});
