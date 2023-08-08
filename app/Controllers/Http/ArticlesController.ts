import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Article from 'App/Models/Article';
import ArticleValidator from 'App/Validators/ArticleValidator';

export default class ArticlesController {
  public async index({ response }: HttpContextContract) {
    const articles = await Article.all();
    return response.status(200).json(articles);
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(ArticleValidator);

    await Article.create(data);

    return response.status(201).json({
      success: true,
      message: 'Article registered successfully',
    });
  }

  public async show({ params, response }: HttpContextContract) {
    const article = await Article.findOrFail(params.id);

    return response.status(200).json(article);
  }

  public async update({ params, request, response }: HttpContextContract) {
    const data = await request.validate(ArticleValidator);

    const article = await Article.findOrFail(params.id);
    article.merge(data);
    await article.save();

    return response.status(200).json({
      success: true,
      message: 'Article updated successfully',
    });
  }

  public async destroy({ params, response }: HttpContextContract) {
    const article = await Article.findOrFail(params.id);
    await article.delete();

    return response.status(200).json({
      success: true,
      message: 'Article deleted successfully',
    });
  }
}
