import express, { Request, Response } from 'express';
import path from 'path';
import { router } from '../routes/routes';

const PORT = process.env.PORT || 3001;
const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../frontend/build'));
}

app.use(router);

app.get('*', (_: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

app.listen(PORT, function () {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
