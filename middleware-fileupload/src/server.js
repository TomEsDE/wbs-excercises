import express from 'express';
import dotenv from 'dotenv';
import { routesUpload } from './routes/upload';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = express();
const PORT = process.env.PORT ?? 3004;

/** images & co */
app.use(express.static('public'));

// app.get('/verify/:token', secure);
// app.use('/user', routesUser);
app.use(routesUpload);

/** Error handling */
app.use((error, req, res, next) => {
  let errorMsg = '';
  if (error instanceof Error) {
    errorMsg = { error: error.message };
  } else errorMsg = error;
  console.log('error-middleware', errorMsg);

  return res.status(400).json(errorMsg);
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
