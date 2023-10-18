import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import fastifyStatic from '@fastify/static'
import fastifyCors from '@fastify/cors'
import fastify from 'fastify'
import multer from 'fastify-multer'
import path from 'node:path'

import { ZodError } from 'zod'
import { env } from './env'
import { orgsRoutes } from './http/controllers/org/routes'
import { petsRoutes } from './http/controllers/pet/routes'

export const app = fastify()

app.register(fastifyCors)
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})
app.register(fastifyCookie)
app.register(multer.contentParser)
app.register(fastifyStatic, {
  root: path.join(__dirname, '..', 'tmp'),
  prefix: '/images/',
})

app.register(orgsRoutes)
app.register(petsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
    return error
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
