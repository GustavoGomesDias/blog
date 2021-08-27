import Article from '../models/Article';
import User from '../models/User';

interface IDatabase {
  uri: string;
  collectionName: string;
  model: typeof Article | typeof User;
}

export default IDatabase;
