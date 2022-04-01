import picture from '../model/picture';

class PictureService {
  async createPicture(pictureDto) {
    const { fileName, path } = pictureDto;

    // unique filename in db
    const pictureDB = await picture.getPictureByName(fileName);

    if (!pictureDB) return picture.createPicture(fileName, path);
    else return pictureDB.id;
  }

  async getPictures() {
    const picturesDB = await picture.getPictures();

    console.log('picturesDB', picturesDB.id);
    // pictureDB.pictures = await picture.getPicturePictures(pictureDB.id);

    return picturesDB;
  }

  async getPicture(id) {
    const pictureDB = await picture.getPicture(id);

    console.log('pictureDB', pictureDB);
    // pictureDB.pictures = await picture.getPicturePictures(pictureDB.id);

    return pictureDB;
  }

  async editPicture(id, pictureDto) {
    const { fileName, path } = pictureDto;
    const pictureDB = await picture.updatePicture(id, fileName, path);

    console.log('pictureDB', pictureDB);
    // pictureDB.pictures = await picture.getPicturePictures(pictureDB.id);

    return pictureDB;
  }

  async deletePicture(id) {
    const pictureDB = await picture.deletePicture(id);

    console.log('pictureDB', pictureDB);
    // pictureDB.pictures = await picture.getPicturePictures(pictureDB.id);

    return pictureDB;
  }
}

export default new PictureService();
