import {Router} from 'express';
// import mongoose from 'mongoose';

const router = new Router();

router.get('/order/list', (req, res) => {
  res.render('order/list', {
    title: 'TEST'
  });
});

export default router;
