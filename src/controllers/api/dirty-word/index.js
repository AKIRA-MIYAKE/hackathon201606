import express from 'express';

import Checker from '../../../lib/dirty-word/checker';

/* eslint-disable */
const router = express.Router();


router.get('/check/:text', (req, res) => {
  const text = req.params.text;
  const checker = new Checker(text);

  Promise.resolve()
  .then(() => {
    return checker.check();
  }).then((result) => {
    res.send(result);
  }).catch((error) => {
    next(error);
  });
});


export default router;
