import 'es6-promise';
import 'isomorphic-fetch';

import httpErrors from 'http-errors';

import XMLParser from './xml-parser';


let sharedInstance = undefined;


function fetchXML() {
  return Promise.resolve()
  .then(() => {
    return fetch('http://monoroch.net/kinshi/housouKinshiYougo.xml')
    .then((response) => {
      if (response.status >= 400) {
        const error = httpErrors(
          response.status,
          'housouKinshiYougo Error',
          response
        );

        throw error;
      }

      return response.text();
    });
  });
}


export function sharedList() {
  return Promise.resolve()
  .then(() => {
    if (sharedInstance) {
    return sharedInstance;
    }

    return fetchXML()
    .then((xml) => {
      const parser = new XMLParser(xml);
      sharedInstance = parser.parse();
      return sharedInstance;
    });
  });
}
