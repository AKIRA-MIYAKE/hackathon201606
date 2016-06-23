import express from 'express';

/* eslint-disable */
const router = express.Router();


router.get('/', (req, res) => {
  res.render('main');
});


export default router;
