import express from 'express';

import { check } from '../../../lib/dirty-word';

/* eslint-disable */
const router = express.Router();


router.get('/check/:text', (req, res) => {
  const text = req.params.text;

  Promise.resolve()
  .then(() => check(text))
  .then((result) => {
    res.send(result);
  }).catch((error) => {
    next(error);
  });
});

router.post('/check', (req, res) => {
  const text = req.body.text;

  Promise.resolve()
  .then(() => check(text))
  .then((result) => {
    res.send(result);
  }).catch((error) => {
    next(error);
  });
});


export default router;
