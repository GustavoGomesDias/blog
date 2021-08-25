import { ObjectId } from 'mongodb';

import db from '../infra/database';
import IArticle, { ArticleInput } from '../interfaces/IArticles';
import ArticleModel from '../models/Article';

const findById = async (articleId: string) => {
  try {
    const article = await db.connect('articles', ArticleModel);

    return article?.collection('articles').findOne(
      { _id: new ObjectId(articleId) },
    );
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const createArticle = async (article: ArticleInput) => {
  try {
    const {
      title, description, content,
    } = article;

    const newArticle = await db.connect('articles', ArticleModel);
    return newArticle?.collection('articles').insertOne({
      title, description, content,
    });
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const updateArticle = async (article: Partial<IArticle>) => {
  try {
    const {
      articleId, title, description, content,
    } = article;
    const updateInfoObject: Partial<IArticle> = {};

    if (title) updateInfoObject.title = title;
    if (description) updateInfoObject.description = description;
    if (content) updateInfoObject.content = content;

    const editedArticle = await db.connect('articles', ArticleModel);

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

const deleteArticle = async (articleId: ObjectId) => {
  try {
    const article = await db.connect('articles', ArticleModel);

    return article?.collection('articles').deleteOne({
      _id: articleId,
    });
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export default {
  findById,
  createArticle,
  updateArticle,
  deleteArticle,
};
