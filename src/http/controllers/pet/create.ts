import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  console.log(request.body)

  const registerBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.enum(['PUPPY', 'ADULT', 'ELDERLY']),
    size: z.enum(['SMALL', 'MEDIUM', 'BIG']),
    energy: z.enum(['VERY_LOW', 'LOW', 'AVERAGE', 'HIGH', 'VERY_HIGH']),
    independence: z.enum(['LOW', 'AVERAGE', 'HIGH']),
    environment: z.string(),
    adoptionRequirements: z.array(z.string()),
    petPictures: z.array(z.string()),
  })

  const {
    name,
    about,
    age,
    size,
    energy,
    independence,
    environment,
    adoptionRequirements,
    petPictures,
  } = registerBodySchema.parse(request.body)

  const createPetUseCase = makeCreatePetUseCase()

  const { pet } = await createPetUseCase.execute({
    name,
    about,
    age,
    size,
    energy,
    independence,
    environment,
    adoptionRequirements,
    petPictures,
    orgId: request.user.sub,
  })

  return reply.status(201).send({
    pet: pet.id,
  })
}
