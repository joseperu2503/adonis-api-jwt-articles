import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { JWT } from "node-jsonwebtoken";

export default class Jwt {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL

    interface Payload {
      id: number,
      name: string,
    }
    const jwt = new JWT<Payload>('secret_key');
    try {
      const authorizationHeader = request.header('Authorization');
      if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
        // Extraer el token JWT eliminando la parte "Bearer "
        const token = authorizationHeader.replace('Bearer ', '');

        // Hacer algo con el token
        if (token) {
          await jwt.verify(token);
          await next()
        }
      }

    } catch (error) {
      return response.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }
  }
}
