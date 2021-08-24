import { Request, Response } from 'express';

import { validationField } from '../validations/validations';
import Article from '../repositories/article';
import IArticle from '../interfaces/IArticles';

const createArticle = async (req: Request, res: Response) => {
  try {
    const { title, description, content }: IArticle = req.body;

    if (validationField(title)) {
      return res.status(400).json({ error: 'Título não é válido.' });
    }

    if (validationField(description)) {
      return res.status(400).json({ error: 'Descrição não é válido.' });
    }

    if (validationField(content)) {
      return res.status(400).json({ error: 'Conteúdo não é válido.' });
    }

    const article = await Article.createArticle({ title, description, content });

    console.log(article);

    return res.status(201).json({ message: 'Artigo criado com sucesso!', article });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err });
  }
};

export default {
  createArticle,
};
