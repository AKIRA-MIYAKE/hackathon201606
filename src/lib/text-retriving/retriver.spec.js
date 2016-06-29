import assert from 'power-assert';

import Retriver from './retriver';


describe('lib/text-retriving', () => {

  describe('Retriver', () => {

    describe('prepare()', () => {

      it('shoud return prepared instance with promise.', () => {
        const retriver = new Retriver();
        return retriver.prepare()
        .then((preparedRetriver) => {
          assert.ok(preparedRetriver.isReady);
          assert.deepEqual(retriver, preparedRetriver);
        });
      });

    });

  });

  describe('retrive()', () => {

    const criterion = [
      'バナナ',
      'テスト',
      'テキスト検索'
    ];

    it('should return matched indexes of criterion.', () => {
      const target = 'テキスト検索が正常に実行できるかのテスト。';

      return new Retriver(criterion).prepare()
      .then((retriver) => {
        const indexes = retriver.retrive(target);

        assert.ok(indexes.length === 2);
        indexes.forEach((index) => {
          switch (index) {
            case 0:
              assert.equal(indexes[index], 1);
              break;
            case 1:
              assert.equal(indexes[index], 2);
              break;
            default:
              break;
          }
        });
      });
    });

    it('should retrive word of orthographical variants', () => {
      const target = 'テキストけんさくで表記ゆれがあってもマッチング可能か。あとバナナ。';

      return new Retriver(criterion).prepare()
      .then((retriver) => {
        const indexes = retriver.retrive(target);

        assert.ok(indexes.length === 1);
        indexes.forEach((index) => {
          switch (index) {
            case 0:
              assert.equal(indexes[index], 0);
              break;
            case 1:
              assert.equal(indexes[index], 2);
              break;
            default:
              break;
          }
        });
      });
    });

  });

});
