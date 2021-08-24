import { ObjectId } from 'mongodb';

import db from '../infra/database';
import IArticle from '../interfaces/IArticles';

const findById = async (articleId: ObjectId) => {
  try {
    const article = await db.connect('articles');

    return article?.collection('articles').findOne(
      { _id: articleId },
    );
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const createArticle = async (article: IArticle) => {
  try {
    const {
      title, description, content,
    } = article;

    const newArticle = await db.connect('articles');
    return newArticle?.collection('articles').insertOne({
      title, description, content,
    });
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const updateArticle = async (articleId: ObjectId, article: Partial<IArticle>) => {
  try {
    const { title, description, content } = article;
    const updateInfoObject: Partial<IArticle> = {};

    if (title) updateInfoObject.title = title;
    if (description) updateInfoObject.description = description;
    if (content) updateInfoObject.content = content;

    const editedArticle = await db.connect('articles');

    return editedArticle?.collection('articles').updateOne(
      { _id: articleId },
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
    const article = await db.connect('articles');

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
