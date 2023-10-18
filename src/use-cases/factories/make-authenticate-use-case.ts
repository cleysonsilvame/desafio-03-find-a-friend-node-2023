import { PrismaOrgRepository } from '@/repositories/prisma/prisma-org-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const prismaOrgRepository = new PrismaOrgRepository()
  const authenticateUseCase = new AuthenticateUseCase(prismaOrgRepository)

  return authenticateUseCase
}
