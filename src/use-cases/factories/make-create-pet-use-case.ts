import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { CreatePetUseCase } from '../create-pet'

export function makeCreatePetUseCase() {
  const prismaPetRepository = new PrismaPetRepository()
  const authenticateUseCase = new CreatePetUseCase(prismaPetRepository)

  return authenticateUseCase
}
