const main = require('../bin/main.js');
const assert = require('chai').assert;

describe('Basic Declarations', function(){
  it('Assign a Numeral value to a variable',function(){
    assert.equal(1,main.testThis("x=1;").get("x"));
  });
  it('Assign a String value to a variable',function(){
    assert.equal("Hello Word!",main.testThis("x=\"Hello Word!\";").get("x"));
  });
  it('Assign a List value to a variable',function(){
    assert.equal([1,2,3],main.testThis("x=[1,2,3];").get("x"));
  });
});

describe('Arithmetic functions', function(){
  it('Add 2 expressions',function(){
    assert.equal(2.5,main.testThis("x=2*1+1/2;").get("x"));
  });
  it('Multiplying a Numeral value with NaN throws an Exception',function(){
    assert.equal(new Error('Type Error'),main.testThis("x=1/0 * 6;").get("x"));
  });
  it('Adding an expression with a Boolean value throws an Exception',function(){
    assert.equal(new Error('Type Error'),main.testThis("x=True + 4*3;").get("x"));
  });
});

describe('Compare operators', function(){
  it('Compare equal values',function(){
    assert.equal(true,main.testThis("x=2*3==6;").get("x"));
  });
  it('Compare not equal values',function(){
    assert.equal(true,main.testThis("x=5/2/=2;").get("x"));
  });
  it('Compare greater values',function(){
    assert.equal(false,main.testThis("x=5>(3+4);").get("x"));
  });
  it('Compare greater or equal values',function(){
    assert.equal(true,main.testThis("x=5*3>=60/3;").get("x"));
  });
  it('Compare less values',function(){
    assert.equal(false,main.testThis("x=-30<-20;").get("x"));
  });
  it('Compare less or equal values',function(){
    assert.equal(false,main.testThis("x=-30<=-20;").get("x"));
  });
});