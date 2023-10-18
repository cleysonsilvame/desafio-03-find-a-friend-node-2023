import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { uploadConfig } from '@/lib/multer'

import { create } from './create'
import { upload } from './upload'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', { onRequest: [verifyJwt] }, create)
  app.post(
    '/pets/pictures/upload',
    { onRequest: [verifyJwt], preHandler: uploadConfig.array('images', 6) },
    upload,
  )
}
