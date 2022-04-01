import fs from 'fs';
import path from 'path';
import pictureService from '../service/picture';

class UploadController {
  async doUpload(req, res, next) {
    try {
      let html = `<p style='font-size: smaller; font-family: sans-serif'><a href='/'>back</a></p><h2>Here is the picture:</h2>`;

      // req.images.forEach((img) => {
      for (let img of req.images) {
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
        const id = await pictureService.createPicture({
          fileName: img.originalname,
          path: `/${destinationPath}`,
        });
        console.log('pic-id', id);

        img.fileName = img.originalname;
        img.path = `/${destinationPath}`;

        html += `<img width='800' src='/${destinationPath}' alt='something'/>`;
      }

      // return res.status(200).send(html);
      return res.status(200).send(createPicturesPage(req.images));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getPictures(req, res, next) {
    try {
      const result = await pictureService.getPictures();
      return res.status(200).send(createPicturesPage(result));
    } catch (error) {
      next(error);
    }
  }
}

function createPicturesPage(images) {
  let indexHtml = '';
  indexHtml += `<p style='font-size: smaller'><a href='/'>back</a></p>`;
  indexHtml += `<section style='margin: 1rem; font-family: sans-serif'>`;
  indexHtml += `<h1>Uploaded Images:</h1>`;
  indexHtml += `<p>Browse through the links to see your uploaded pictures</p>`;
  indexHtml += `<ul>`;

  images.forEach((img) => {
    indexHtml += `
    <li style='margin-bottom: 1rem'><p><a href='${img.path}'>${img.fileName}</a></p><img width='800' src='${img.path}' /></li>`;
    // <li style='margin-bottom: 1rem'><a href='${img.path}'>${img.fileName}</a></li>`;
  });
  indexHtml += `</ul>`;

  indexHtml += `</section>`;

  return indexHtml;
}

export default new UploadController();
