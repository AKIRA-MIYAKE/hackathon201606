import 'es6-promise';
import 'isomorphic-fetch';

import httpErrors from 'http-errors';
import FormData from 'form-data';


export function login(id = '', password = '', model = {}) {
  return Promise.resolve()
  .then(() => {
    if (id.length === 0 || password.length === 0) {
      throw new Error('id and password are required.');
    }

    return fetch('https://try-api.recaius.jp/asr/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, password, model })
    });
  }).then((response) => {
    if (response.status >= 400) {
      const error = httpErrors(
        response.status,
        'RECAIUS Error',
        response
      );

      throw error;
    }

    return response.text();
  });
}


export function logout(uuid = '') {
  return Promise.resolve()
  .then(() => {
    if (uuid.length !== 36) {
      throw new Error('UUID is required');
    }

    return fetch(`https://try-api.recaius.jp/asr/v1/${uuid}/logout`, {
      method: 'POST'
    }).then((response) => {
      if (response.status >= 400) {
        const error = httpErrors(
          response.status,
          'RECAIUS Error',
          response
        );

        throw error;
      }

      return true;
    });
  });
}


export function voice(voiceid = 0, ) {

}
