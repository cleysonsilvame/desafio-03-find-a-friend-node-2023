import { makeGetPetsCityUseCase } from '@/use-cases/factories/make-get-pets-by-city-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getPetByCity(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    city: z.string().min(3),
  })

  const { city } = paramsSchema.parse(request.params)

  const filterSchema = z.object({
    age: z.enum(['PUPPY', 'ADULT', 'ELDERLY']).optional(),
    size: z.enum(['SMALL', 'MEDIUM', 'BIG']).optional(),
    energy: z
      .enum(['VERY_LOW', 'LOW', 'AVERAGE', 'HIGH', 'VERY_HIGH'])
      .optional(),
    independence: z.enum(['LOW', 'AVERAGE', 'HIGH']).optional(),
  })

  const filters = filterSchema.parse(request.query)

  const getPetByCityUseCase = makeGetPetsCityUseCase()

  const pets = await getPetByCityUseCase.execute({ city, filters })

  reply.send(pets)
}
