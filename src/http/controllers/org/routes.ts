import { FastifyInstance } from 'fastify'

// import { verifyJwt } from '@/http/middlewares/verify-jwt'

import { authenticate } from './authenticate'
import { create } from './create'
import { refresh } from './refresh'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', create)
  app.post('/sessions', authenticate)
  app.patch('/token/refresh', refresh)
}
