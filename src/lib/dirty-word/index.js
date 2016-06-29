import httpErrors from 'http-errors';

import 'es6-promise';
import 'isomorphic-fetch';


import XMLParser from './xml-parser';
import Retriver from '../text-retriving/retriver';


let _sharedListInstance = undefined;
let _sharedRetriverInstance = undefined;


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


function _sharedRetriver() {
  return Promise.resolve()
  .then(() => {
    if (_sharedRetriverInstance) {
      return _sharedRetriverInstance;
    }

    return _sharedList()
    .then((list) => {
      const criterion = list.dirtyWord.map((word) => word.value);
      return new Retriver(criterion).prepare()
    }).then((retriver) => {
      _sharedRetriverInstance = retriver;
      return retriver;
    });
  });
}


export function check(text = '') {
  return Promise.all([
    _sharedList(),
    _sharedRetriver()
  ]).then(([list, retriver]) => {
    return retriver.retrive(text)
    .map((matchedIndex) => list.dirtyWord[matchedIndex]);
  });
}
