import assert from 'power-assert';

import { createTokenizer } from './tokenizer';


describe('lib/morphological-analysis', () => {

  describe('tokenizer', () => {

    describe('createTokenizer()', () => {

      it('should return tokenizer.', () => {
        return createTokenizer()
        .then((tokenizer) => {
          assert.ok(tokenizer);
        });
      });

    });

    it('should get result form tokenizer.', () => {
      return createTokenizer()
      .then((tokenizer) => {
        const result = tokenizer.tokenize('黒文字');
        assert.equal(result[0].pos, '名詞');
      });
    });

  });

});
