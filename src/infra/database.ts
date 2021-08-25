/* eslint-disable no-unused-vars */
import { MongoClient } from 'mongodb';
import ArticleModel from '../models/Article';
import UserModel from '../models/User';

const uri = 'mongodb://localhost:27017/blog';

const connect = async (
  collectionName: string, model: typeof ArticleModel | typeof UserModel,
) => {
  try {
    const connection = await MongoClient.connect(uri);

    const db = connection.db('blog');
    const collections = await db.collections();
    const coll = collections.map((collect) => collect.collectionName).includes(collectionName);
    if (!coll) await db.createCollection(collectionName, model);
    return db;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export default {
  connect,
};
