import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ArticleValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    description: schema.string(),
    price: schema.number(),
    stock: schema.number()
  })

  public messages: CustomMessages = {
    'description.required': 'Description is required.',
    'price.required': 'Price is required.',
    'stock.required': 'Stock is required.',
    'price.numeric': 'Price must be a number.',
    'stock.numeric': 'Stock must be a number.',
  }
}
