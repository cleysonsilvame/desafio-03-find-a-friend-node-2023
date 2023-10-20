import { PetNotFoundError } from '@/use-cases/errors/pet-not-found'
import { makeGetPetIdUseCase } from '@/use-cases/factories/make-get-pet-by-id-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getPetById(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = paramsSchema.parse(request.params)

  const getPetByIdUseCase = makeGetPetIdUseCase()

  try {
    const pet = await getPetByIdUseCase.execute({ petId: id })

    reply.send(pet)
  } catch (error) {
    if (error instanceof PetNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
