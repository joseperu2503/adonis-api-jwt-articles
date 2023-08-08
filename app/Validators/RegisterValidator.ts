import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    name: schema.string(),
    email: schema.string([
      rules.email()
    ]),
    password: schema.string([
      rules.confirmed(),
    ])
  })

  public messages: CustomMessages = {
    'name.required': 'Name is required.',
    'email.required': 'Email is required.',
    'email.email': 'Invalid email format.',
    'email.unique': 'Email is already registered.',
    'password.required': 'Password is required.',
    'password.confirmed': 'Please confirm your password.',
  }
}
