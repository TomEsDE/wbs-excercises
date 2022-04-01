import fs from 'fs';

const checkImage = (req, res, next) => {
  console.log('checkImage');
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any

  try {
    doImageCheck(req.file);
    req.images = [req.file];

    return next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const checkImages = (req, res, next) => {
  console.log('checkImages');

  const imgs = [];
  req.files.forEach((file) => {
    try {
      doImageCheck(file);
      imgs.push(file);
    } catch (error) {
      console.log(error);
    }
  });

  if (imgs.length === 0) {
    return next(new Error('no images selected'));
  }

  req.images = imgs;
  next();
};

const doImageCheck = (file) => {
  try {
    console.log('file', file);
    if (!file) {
      throw new Error('no file found');
    }

    if (!file.mimetype.startsWith('image')) {
      // delete file and send error
      fs.unlinkSync(file.path);
      throw new Error('not an image');
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { checkImage, checkImages };
