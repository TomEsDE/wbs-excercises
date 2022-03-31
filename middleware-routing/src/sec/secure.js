import express from 'express';

const secure = (req, res, next) => {
  console.log('secure');

  if (!req.params.token || req.params.token.trim().length <= 3) {
    // res.status(403);
    res.sendStatus(403);
    return;
  }

  res.status(200).send('check');
};

export default secure;
