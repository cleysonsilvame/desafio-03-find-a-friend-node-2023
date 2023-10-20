import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { Filters, PetRepository } from '../pet-repository'

export class PrismaPetRepository implements PetRepository {
  async save(pet: Prisma.PetUncheckedCreateInput) {
    return prisma.pet.create({ data: pet })
  }

  async getByCity(city: string, filters?: Filters) {
    return prisma.pet.findMany({
      where: {
        org: {
          city,
        },
        ...filters,
      },
    })
  }

  async getPetById(petId: string) {
    return prisma.pet.findUnique({ where: { id: petId } })
  }
}
