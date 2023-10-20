import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { GetPetByIdUseCase } from '../get-pet-by-id'

export function makeGetPetIdUseCase() {
  const prismaPetRepository = new PrismaPetRepository()
  const authenticateUseCase = new GetPetByIdUseCase(prismaPetRepository)

  return authenticateUseCase
}
