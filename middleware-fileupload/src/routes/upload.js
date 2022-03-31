import express from 'express';
import uploadController from '../controller/upload';
// ...rest of the initial code omitted for simplicity.
import { body, param } from 'express-validator';
import validate from './validate';

import path from 'path';
import multer from 'multer';
const upload = multer({ dest: path.resolve('public/uploads/') });

const routesUpload = express.Router();

routesUpload.get('/', (req, res, next) => {
  return res.status(200).sendFile(path.resolve('public/fileupload.html'));
});

routesUpload.post(
  '/upload-profile-pic',
  upload.single('profile_pic'),
  // validate([param('file').not().isEmpty()]),
  uploadController.doUpload
);

export { routesUpload };
