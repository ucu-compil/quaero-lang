import { describe, it, } from 'mocha';
import { assert } from 'chai';
import { Addition, Numeral, Exp, Division } from '../../src/ast/AST';
import { State } from '../../src/interpreter/State';

describe('Calculator', () => {
  it('should add two numbers', () => {
    let addition: Addition;
    let auxExp: Exp;
    let state: State = new State();
    addition = new Addition(new Numeral(1), new Numeral(1));
    assert.equal(addition.evaluate(state), 2, 'Numeral values can be summed between them');
    auxExp = new Division(new Numeral(1), new Numeral(0));
    addition = new Addition(auxExp, new Numeral(1));
    assert.equal(addition.evaluate(state), Infinity, 'Infinity plus infity is equals to infinity');
  });
});