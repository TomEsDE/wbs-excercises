import fs from 'fs';
import path from 'path';

class UploadController {
  async doUploadPic(req, res, next) {
    return await doUpload(req, res, next);
  }

  async doUploadPics(req, res, next) {
    req.file = req.images[0];
    return await doUpload(req, res, next);
  }
}

async function doUpload(req, res, next) {
  try {
    let destinationPath = `imgs/${req.file.originalname}`;

    fs.rename(
      req.file.path,
      path.resolve(`public/${destinationPath}`),
      function (err) {
        if (err) throw err;
        console.log('File moved and renamed.');
      }
    );

    return res
      .status(200)
      .send(
        `<h2>Here is the picture:</h2><img width='800' src='/${destinationPath}' alt='something'/>`
      );
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export default new UploadController();
