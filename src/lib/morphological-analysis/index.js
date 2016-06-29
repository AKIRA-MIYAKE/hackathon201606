import { createTokenizer } from './tokenizer';


let _sharedTokenizerInstance = undefined;


export function sharedTokenizer() {
  return Promise.resolve()
  .then(() => {
    if (_sharedTokenizerInstance) {
      return _sharedTokenizerInstance;
    }

    return createTokenizer()
    .then((tokenizer) => {
      _sharedTokenizerInstance = tokenizer;
      return tokenizer;
    });
  });
}
