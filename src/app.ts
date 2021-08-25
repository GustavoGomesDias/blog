import express from 'express';

import Article from './routes/article';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', Article);

export default app;
