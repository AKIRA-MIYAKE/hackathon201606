import assert from 'power-assert';

import { sharedTokenizer } from './tokenizer';


describe('lib/morphological-analysis', () => {

  describe('tokenizer', () => {

    describe('sharedTokenizer()', () => {

      it('should return shared tokenizer with promise.', () => {
        let tokenizer1 = null;
        let tokenizer2 = null;

        return sharedTokenizer()
        .then((tokenizer) => {
          tokenizer1 = tokenizer;
          return sharedTokenizer();
        }).then((tokenizer) => {
          tokenizer2 = tokenizer;

          assert.deepEqual(tokenizer1, tokenizer2);
        });
      });

    });

    it('should get result form tokenizer.', () => {
      return sharedTokenizer()
      .then((tokenizer) => {
        const result = tokenizer.tokenize('黒文字');
        assert.equal(result[0].pos, '名詞');
      });
    });

  });

});
