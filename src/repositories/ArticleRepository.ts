import { ObjectId } from 'mongodb';

import Database from '../infra/database';
import IArticle, { ArticleInput, IArticleRepository } from '../interfaces/IArticles';
import ArticleModel from '../models/Article';

class ArticleRepository implements IArticleRepository {
  db: Database;

  constructor() {
    this.db = new Database('articles', ArticleModel);
  }

  public findById = async (articleId: string) => {
    try {
      const article = await this.db.connect();

      return article?.collection('articles').findOne(
        { _id: new ObjectId(articleId) },
      );
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };

  public createArticle = async (article: ArticleInput) => {
    try {
      const {
        title, description, content,
      } = article;

      const newArticle = await this.db.connect();
      return newArticle?.collection('articles').insertOne({
        title, description, content,
      });
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };

  public updateArticle = async (article: Partial<IArticle>) => {
    try {
      const {
        articleId, title, description, content,
      } = article;
      const updateInfoObject: Partial<IArticle> = {};

      if (title) updateInfoObject.title = title;
      if (description) updateInfoObject.description = description;
      if (content) updateInfoObject.content = content;

      const editedArticle = await this.db.connect();

      return editedArticle?.collection('articles').updateOne(
        { _id: new ObjectId(articleId) },
        {
          $set: { ...updateInfoObject },
          $currentDate: { lastModified: true },
        },
      );
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };

  public deleteArticle = async (articleId: ObjectId) => {
    try {
      const article = await this.db.connect();

      return article?.collection('articles').deleteOne({
        _id: articleId,
      });
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };
}

export default ArticleRepository;
