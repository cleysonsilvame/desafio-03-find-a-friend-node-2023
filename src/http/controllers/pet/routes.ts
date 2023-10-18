import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/test', { onRequest: [verifyJwt] }, () => {
    return { ok: true }
  })
}
