import { sharedList } from './dirty-word-list';


export default class Checker {

  constructor(text = '') {
    this.text = text;
  }

  check() {
    return Promise.resolve()
    .then(() => sharedList())
    .then((list) => {
      const result = list.dirtyWord
      .filter((word) => this.text.match(word.value));

      return result;
    });
  }

}
