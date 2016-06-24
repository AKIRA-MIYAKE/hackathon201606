import assert from 'power-assert';

import { sharedList } from './dirty-word-list';


describe('lib/dirty-word', () => {

  describe('dirty-word-list', () => {

    describe('sharedList()', () => {

      it('shoud return shared list with promise.', () => {
        return sharedList()
        .then((list) => {
          assert.ok(list);
        });
      });

    });

  });

});
