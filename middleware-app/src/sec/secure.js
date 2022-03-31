import express from 'express';

const secure = (req, res, next) => {
  console.log('secure');

  if (!req.query.token || req.query.token.trim().length === 0) {
    res.sendStatus(403);
  }
  next();
};

export default secure;
