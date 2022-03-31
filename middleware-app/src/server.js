import express from 'express';
import secure from './sec/secure';

const app = express();
const port = 3000;

app.use(secure);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
