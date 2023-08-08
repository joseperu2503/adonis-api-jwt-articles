import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'
import User from "App/Models/User";
import RegisterValidator from 'App/Validators/RegisterValidator';
import LoginValidator from 'App/Validators/LoginValidator';
import { JWT } from "node-jsonwebtoken";

export default class AuthController {
  public async login({ request, response }: HttpContextContract) {
    const data = await request.validate(LoginValidator);

    const email = data.email;
    const password = data.password;

    const user = await User.findBy('email', email);
    if (!user) {
      return response.status(401).json({
        success: false,
        message: 'Invalid credentials',
      })
    }

    const isPasswordValid = await Hash.verify(user.password, password);
    if (!isPasswordValid) {
      return response.status(401).json({
        success: false,
        message: 'Invalid credentials',
      })
    }

    const jwt = new JWT('secret_key');
    const token = await jwt.sign(user.$original, { expiresIn: 60 * 60 });

    return response.status(200).json({
      success: true,
      token: token
    });
  }

  public async register({ request, response }: HttpContextContract) {
    const data = await request.validate(RegisterValidator);

    await User.create({
      name: data.name,
      email: data.email,
      password: data.password
    })

    return response.status(201).json({
      success: true,
      message: 'User registered successfully'
    });
  }
}
