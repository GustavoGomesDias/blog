import { ObjectId } from 'mongodb';

interface IArticle {
  title: string;
  description: string
  content: string;
  userId: ObjectId;
}

export default IArticle;
