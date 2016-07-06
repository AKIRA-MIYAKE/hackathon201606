import path from 'path';

import kuromoji from 'kuromoji';


const dicPath = path.resolve(__dirname, '../../../node_modules/kuromoji/dist/dict');


export function createTokenizer() {
  return Promise.resolve()
  .then(
    () => new Promise((resolve, reject) => {
      kuromoji.builder({ dicPath })
      .build((error, tokenizer) => {
        if (error) {
          reject(error);
        }

        resolve(tokenizer);
      });
    })
  );
};
