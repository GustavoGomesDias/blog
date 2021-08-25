interface IArticle {
  articleId: string;
  title: string;
  description: string
  content: string;
  // userId: ObjectId;
}

export type ArticleInput = Omit<IArticle, 'articleId'>

export default IArticle;
