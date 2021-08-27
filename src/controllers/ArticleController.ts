import { Request, Response } from 'express';

import { validationField } from '../validations/validations';
import ArticleRepository from '../repositories/ArticleRepository';
import IArticle from '../interfaces/IArticles';

class ArticleController {
  repository: ArticleRepository;

  constructor() {
    this.repository = new ArticleRepository();
  }

  // Usar o id do user vindo do req.userId no meddleware
  public getArticlesByUserId = () => {};

  public getArticleById = async (req: Request, res: Response) => {
    try {
      const { articleId } = req.params;

      const article = await this.repository.findById(articleId);

      return res.status(200).json(article);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err });
    }
  };

  public createArticle = async (req: Request, res: Response) => {
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

      await this.repository.createArticle({ title, description, content });

      return res.status(201).json({ message: 'Artigo criado com sucesso!' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err });
    }
  };

  public updateArticle = async (req: Request, res: Response) => {
    try {
      // comparar req.userId com user_id;
      const {
        articleId, title, description, content,
      }: Partial<IArticle> = req.body;

      if (!articleId) return res.status(400).json({ error: 'Falha no envio do id' });

      await this.repository.updateArticle({
        articleId, title, description, content,
      });

      return res.status(200).json({ message: 'Artigo alterado com sucesso' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err });
    }
  };
}

export default new ArticleController();
