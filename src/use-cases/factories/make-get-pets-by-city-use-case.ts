import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { GetPetsByCityUseCase } from '../get-pets-by-city'

export function makeGetPetsCityUseCase() {
  const prismaPetRepository = new PrismaPetRepository()
  const authenticateUseCase = new GetPetsByCityUseCase(prismaPetRepository)

  return authenticateUseCase
}
