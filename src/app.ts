import express from 'express';

import Article from './routes/articles';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', Article);

export default app;
