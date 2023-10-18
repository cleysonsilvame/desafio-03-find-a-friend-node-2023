import { Org, Prisma } from '@prisma/client'

export interface OrgRepository {
  save(org: Prisma.OrgCreateInput): Promise<Org>
  findByEmail(email: string): Promise<Org | null>
}
