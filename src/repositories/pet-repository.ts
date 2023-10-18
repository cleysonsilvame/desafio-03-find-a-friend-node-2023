import { Age, Energy, Independence, Pet, Prisma, Size } from '@prisma/client'

export type Filters = {
  age?: Age
  size?: Size
  energy?: Energy
  independence?: Independence
}

export interface PetRepository {
  save(org: Prisma.PetUncheckedCreateInput): Promise<Pet>
  getByCity(city: string, filters?: Filters): Promise<Pet[]>
  getPetById(petId: string): Promise<Pet | null>
}
