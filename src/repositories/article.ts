import { ObjectId } from 'mongodb';
import IArticle from '../interfaces/IArticles';

export const createArticle = async (article: IArticle) => {
  try {
    const {
      title, description, content, userId,
    } = article;

    const newArticle = await global.db?.collection('articles').insertOne({
      title, description, content, user_id: userId,
    });

    return newArticle;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const updateArticle = async (articleId: ObjectId, article: Partial<IArticle>) => {
  try {
    const { title, description, content } = article;
    const updateInfoObject: Partial<IArticle> = {};

    if (title) updateInfoObject.title = title;
    if (description) updateInfoObject.description = description;
    if (content) updateInfoObject.content = content;

    const editedArticle = await global.db?.collection('articles').updateOne(
      { _id: articleId },
      {
        $set: { ...updateInfoObject },
        $currentDate: { lastModified: true },
      },
    );

    return editedArticle;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};
