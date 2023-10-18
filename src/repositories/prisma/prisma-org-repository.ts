import { Prisma } from '@prisma/client'
import { OrgRepository } from '../org-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrgRepository implements OrgRepository {
  async save(org: Prisma.OrgCreateInput) {
    return prisma.org.create({ data: org })
  }

  async findByEmail(email: string) {
    return prisma.org.findUnique({ where: { email } })
  }
}
