import Database from '../infra/database';

interface IArticle {
  articleId: string;
  title: string;
  description: string
  content: string;
  // userId: ObjectId;
}

export type ArticleInput = Omit<IArticle, 'articleId'>

export interface IArticleRepository {
  db: Database;
}

export default IArticle;
