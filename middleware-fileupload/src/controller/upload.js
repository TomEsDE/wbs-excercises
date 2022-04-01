import fs from 'fs';
import path from 'path';
import pictureService from '../service/picture';

class UploadController {
  async doUpload(req, res, next) {
    try {
      let html = `<h2>Here is the picture:</h2>`;

      req.images.forEach((img) => {
        const destinationPath = `imgs/${img.originalname}`;
        fs.rename(
          img.path,
          path.resolve(`public/${destinationPath}`),
          function (err) {
            if (err) throw err;
            console.log('File moved and renamed.');
          }
        );
        // save in DB
        pictureService.createPicture({
          fileName: img.originalname,
          path: `/${destinationPath}`,
        });

        html += `<img width='800' src='/${destinationPath}' alt='something'/>`;
      });

      return res.status(200).send(html);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

export default new UploadController();
