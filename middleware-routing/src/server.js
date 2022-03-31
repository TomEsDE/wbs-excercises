import express from 'express';
import { routesUser } from './routes/user';
import secure from './sec/secure';

const app = express();
const PORT = process.env.PORT ?? 3004;

// app.use(secure);

app.get('/verify/:token', secure);
app.use('/user', routesUser);

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}/user/1`)
);
