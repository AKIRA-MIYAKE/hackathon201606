import assert from 'power-assert';

import Checker from './checker';


describe('lib/dirty-word', () => {

  describe('Checker', () => {

    describe('check()', () => {

      it('shoud return result that include word, when input text include dirty word.', () => {
        const text = 'アイヌ系';
        const checker = new Checker(text);
        return checker.check()
        .then((result) => {
          assert.equal(result.length, 1);
          assert.equal(result[0].value, 'アイヌ系');
        })
      });

    });

  });

});
