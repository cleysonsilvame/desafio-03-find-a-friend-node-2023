import { PrismaOrgRepository } from '@/repositories/prisma/prisma-org-repository'
import { CreateOrgUseCase } from '../create-org'

export function makeCreateOrgUseCase() {
  const prismaOrgRepository = new PrismaOrgRepository()
  const authenticateUseCase = new CreateOrgUseCase(prismaOrgRepository)

  return authenticateUseCase
}
