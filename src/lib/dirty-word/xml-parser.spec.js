import assert from 'power-assert';

import XMLParser from './xml-parser';


describe('lib/dirty-word', () => {

  describe('XMLParser', () => {

    describe('parse()', () => {

      it('shoud return parsed object.', () => {
        const xml =
        `<housouKinshiYougoList date="2011-03-04" version="1.0">
          <dirtyWord>
            <word reading="あいぬけい" wordClass="名詞">アイヌ系</word>
            <replaceWordList>
              <word reading="あいぬ" wordClass="名詞">アイヌ</word>
              <word reading="あいぬみんぞく" wordClass="名詞">アイヌ民族</word>
            </replaceWordList>
            <notes>アイヌ系はアイヌ民族に対する強制同化が生んだ言葉</notes>
          </dirtyWord>
          <dirtyWord>
            <word reading="あか" wordClass="名詞">アカ</word>
            <replaceWordList>
              <word reading="きょうさんしゅぎしゃ" wordClass="名詞">共産主義者</word>
            </replaceWordList>
            <notes/>
          </dirtyWord>
        </housouKinshiYougoList>`;

        const parser = new XMLParser(xml);

        return parser.parse()
        .then((result) => {
          assert.ok(Array.isArray(result.dirtyWord));
          assert.ok(typeof result.dirtyWord[0].value === 'string');
          assert.ok(Array.isArray(result.dirtyWord[0].replaceWordList));
          assert.ok(typeof result.dirtyWord[0].replaceWordList[0].value === 'string');
          assert.ok(typeof result.dirtyWord[0].notes === 'string');
        });
      });

    });

  });

});
