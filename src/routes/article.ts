import { Router } from 'express';

import Article from '../controllers/article';

const route = Router();

route.get('/:articleId', Article.getArticleById);
route.post('/', Article.createArticle);
route.put('/', Article.updateArticle);

export default route;
