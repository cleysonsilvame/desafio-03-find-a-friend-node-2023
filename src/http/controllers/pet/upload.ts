import { FastifyReply, FastifyRequest } from 'fastify'

export async function upload(request: FastifyRequest, reply: FastifyReply) {
  return reply.status(201).send({
    files: request.files.map((file) => ({
      url: `/images/${file.filename}`,
      originalname: file.originalname,
    })),
  })
}
