import {Router} from 'express';
// import mongoose from 'mongoose';

const router = new Router();

router.get('/', (req, res) => {
  res.render('personal/list', {
    title: 'TEST'
  });
});

export default router;
