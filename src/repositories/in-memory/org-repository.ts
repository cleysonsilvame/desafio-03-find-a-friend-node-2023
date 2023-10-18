import { Org, Prisma } from '@prisma/client'
import { OrgRepository } from '../org-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrgRepository implements OrgRepository {
  items: Org[] = []

  async save(org: Prisma.OrgCreateInput) {
    const newOrg = {
      id: randomUUID(),
      ...org,
    }

    this.items.push(newOrg)

    return newOrg
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email) || null

    return org
  }
}
