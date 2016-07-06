import assert from 'power-assert';

import Retriever from './retriever';


describe('lib/text-retrieving', () => {

  describe('Retrieve', () => {

    describe('prepare()', () => {

      it('shoud return prepared instance with promise.', () => {
        const retriever = new Retriever();
        return retriever.prepare()
        .then((preparedRetriever) => {
          assert.ok(preparedRetriever.isReady);
          assert.deepEqual(retriever, preparedRetriever);
        });
      });

    });

  });

  describe('retrieve()', () => {

    const criterion = [
      'バナナ',
      'テスト',
      'テキスト検索'
    ];

    it('should return matched indexes of criterion.', () => {
      const target = 'テキスト検索が正常に実行できるかのテスト。';

      return new Retriever(criterion).prepare()
      .then((retriever) => {
        const indexes = retriever.retrieve(target);

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

    it('should retrieve word of orthographical variants', () => {
      const target = 'テキストけんさくで表記ゆれがあってもマッチング可能か。あとバナナ。';

      return new Retriever(criterion).prepare()
      .then((retriever) => {
        const indexes = retriever.retrieve(target);

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
