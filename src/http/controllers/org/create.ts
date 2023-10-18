import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists'
import { makeCreateOrgUseCase } from '@/use-cases/factories/make-create-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    cep: z.string().length(8),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    phone_number: z.string().length(11),
  })

  const { name, email, password, cep, address, city, state, phone_number } =
    registerBodySchema.parse(request.body)

  try {
    const createOrgUseCase = makeCreateOrgUseCase()

    await createOrgUseCase.execute({
      name,
      email,
      password,
      cep,
      address,
      city,
      state,
      phone_number,
    })
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
