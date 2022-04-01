import db from '../db/db';

class Picture {
  async createPicture(fileName, path) {
    const [id] = await db('picture')
      .insert({
        name: fileName,
        path: path,
      })
      .returning('id');

    return id.id;
  }

  async getPictures() {
    const result = await db('picture').select({
      id: 'id',
      fileName: 'name',
      path: 'path',
    });

    return result;
  }

  async getPictureByName(fileName) {
    console.log('fileName', fileName);
    const [result] = await db('picture')
      .select({
        id: 'id',
        fileName: 'name',
        path: 'path',
      })
      .where({ name: fileName });

    return result;
  }

  async getPicture(id) {
    const [result] = await db('picture')
      .select({
        id: 'id',
        fileName: 'name',
        path: 'path',
      })
      .where({ id: id });

    return result;
  }

  async updatePicture(id, fileName, path) {
    const result = await db('picture')
      .update({
        name: fileName,
        path: path,
      })
      .where({ id: id });

    return result;
  }

  async deletePicture(id) {
    const result = await db('picture').delete().where({ id: id });

    return result;
  }
}

export default new Picture();
