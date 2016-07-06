import httpErrors from 'http-errors';

import 'es6-promise';
import 'isomorphic-fetch';


import XMLParser from './xml-parser';
import Retriever from '../text-retrieving/retriever';


let _sharedListInstance = undefined;
let _sharedRetrieverInstance = undefined;


function _fetchList() {
  return Promise.resolve()
  .then(
    () => fetch('http://monoroch.net/kinshi/housouKinshiYougo.xml')
    .then((response) => {
      if (response.status >= 400) {
        const error = httpErros(
          respnose.status,
          'HousouKinshiYougo Error',
          response
        );

        throw error;
      }

      return response.text();
    }).then((xml) => {
      const parser = new XMLParser(xml);
      return parser.parse();
    })
  );
}


function _sharedList() {
  return Promise.resolve()
  .then(() => {
    if (_sharedListInstance) {
      return _sharedListInstance;
    }

    return _fetchList()
    .then((list) => {
      _sharedListInstance = list;
      return list;
    });
  });
}


function _sharedRetriever() {
  return Promise.resolve()
  .then(() => {
    if (_sharedRetrieverInstance) {
      return _sharedRetrieverInstance;
    }

    return _sharedList()
    .then((list) => {
      const criterion = list.dirtyWord.map((word) => word.value);
      return new Retriever(criterion).prepare()
    }).then((retriever) => {
      _sharedRetrieverInstance = retriever;
      return retriever;
    });
  });
}


export function check(text = '') {
  return Promise.all([
    _sharedList(),
    _sharedRetriever()
  ]).then(([list, retriever]) => {
    return retriever.retrieve(text)
    .map((matchedIndex) => list.dirtyWord[matchedIndex]);
  });
}
