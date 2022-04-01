import express from 'express';
import uploadController from '../controller/upload';
import path from 'path';
import multer from 'multer';
import { checkImage, checkImages } from '../middleware/checkImage';

// multer config
const upload = multer({ dest: path.resolve('public/uploads/') });

const routesUpload = express.Router();

routesUpload.get('/', (req, res, next) => {
  return res.status(200).sendFile(path.resolve('public/fileupload.html'));
});

routesUpload.get('/get-pics', uploadController.getPictures);

routesUpload.post(
  '/upload-profile-pic',
  upload.single('profile_pic'),
  checkImage,
  uploadController.doUpload
);

routesUpload.post(
  '/upload-cat-pics',
  upload.array('cat_pics', 10),
  checkImages,
  uploadController.doUpload
);

export { routesUpload };
