class UploadController {
  async doUpload(req, res, next) {
    try {
      // req.file is the `avatar` file
      // req.body will hold the text fields, if there were any
      console.log('file', req.file);
      console.log('body', req.body);

      if (!req.file) {
        return next(new Error('no file found'));
      }

      return res.status(200).json({ check: true });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }
}

export default new UploadController();
