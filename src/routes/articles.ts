import { Router } from 'express';

import Article from '../controllers/article';

const route = Router();

route.post('/', Article.createArticle);

export default route;
