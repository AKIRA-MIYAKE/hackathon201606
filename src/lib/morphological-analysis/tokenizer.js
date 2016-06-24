import path from 'path';

import kuromoji from 'kuromoji';


const dicPath = path.resolve(__dirname, '../../../node_modules/kuromoji/dist/dict');

let sharedInstance = undefined;


function createInstance() {
  return Promise.resolve()
  .then(() => {
    return new Promise((resolve, reject) => {
      kuromoji.builder({ dicPath })
      .build((error, tokenizer) => {
        if (error) {
          reject(error);
        }

        resolve(tokenizer);
      });
    });
  });
}


export function sharedTokenizer() {
  return Promise.resolve()
  .then(() => {
    if (sharedInstance) {
      return sharedInstance;
    }

    return createInstance()
    .then((tokenizer) => {
      sharedInstance = tokenizer;
      return tokenizer;
    });
  });
}
