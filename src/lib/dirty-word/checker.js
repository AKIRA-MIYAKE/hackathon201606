import { sharedList } from './dirty-word-list';


export default class Checker {

  constructor(text = '') {
    this.text = text;
  }

  check() {
    return Promise.resolve()
    .then(() => {
      return sharedList();
    }).then((list) => {
      let result = [];

      list.dirtyWord.forEach((word) => {
        if (this.text.match((word.value))) {
          result = result.concat(word);
        }
      });

      return result;
    });
  }

}
