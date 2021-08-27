import { MongoClient } from 'mongodb';

import IDatabase from '../interfaces/IDatabase';
import ArticleModel from '../models/Article';
import UserModel from '../models/User';

class Database implements IDatabase {
  uri: string;

  collectionName: string;

  model: typeof ArticleModel | typeof UserModel;

  constructor(collectionName: string, model: typeof ArticleModel | typeof UserModel) {
    this.uri = 'mongodb://localhost:27017/blog';
    this.collectionName = collectionName;
    this.model = model;
  }

  public connect = async () => {
    try {
      const connection = await MongoClient.connect(this.uri);

      const db = connection.db('blog');
      const collections = await db.collections();
      const coll = collections
        .map((collect) => collect.collectionName).includes(this.collectionName);
      if (!coll) await db.createCollection(this.collectionName, this.model);
      return db;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };
}

export default Database;
