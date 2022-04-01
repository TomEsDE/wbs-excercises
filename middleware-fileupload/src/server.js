import express from 'express';
import dotenv from 'dotenv';
import { routesUpload } from './routes/upload';
import morgan from 'morgan';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = express();
const PORT = process.env.PORT ?? 3004;

app.use(morgan('dev'));
/** images & co */
app.use(express.static('public'));

// routing middleware
app.use(routesUpload);

/** Error handling */
app.use((error, req, res, next) => {
  console.log(error);
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
