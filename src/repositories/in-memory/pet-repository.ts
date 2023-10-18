import { AdoptionRequirements, Pet, PetPictures, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { Filters, PetRepository } from '../pet-repository'
import { InMemoryOrgRepository } from './org-repository'

export class InMemoryPetRepository implements PetRepository {
  items: Pet[] = []
  adoptionRequirements: AdoptionRequirements[] = []
  petPictures: PetPictures[] = []
  orgRepository: InMemoryOrgRepository

  constructor(orgRepository?: InMemoryOrgRepository) {
    this.orgRepository = orgRepository ?? ({} as InMemoryOrgRepository)
  }

  async save(pet: Prisma.PetUncheckedCreateInput) {
    const newPet = {
      id: randomUUID(),
      ...pet,
    }

    this.items.push(newPet)

    const adoptionRequirements = pet.AdoptionRequirements?.createMany?.data
    if (Array.isArray(adoptionRequirements))
      this.adoptionRequirements.push(
        ...adoptionRequirements.map((requirement) => ({
          id: randomUUID(),
          pet_id: newPet.id,
          description: requirement.description,
        })),
      )

    const petPictures = pet.PetPictures?.createMany?.data

    if (Array.isArray(petPictures))
      this.petPictures.push(
        ...petPictures.map((picture) => ({
          id: randomUUID(),
          pet_id: newPet.id,
          image_url: picture.image_url,
        })),
      )

    return newPet
  }

  async getByCity(city: string, filters?: Filters) {
    return this.items.filter((item) => {
      const isSameCity =
        this.orgRepository.items.find((org) => org.id === item.org_id)?.city ===
        city

      const isSameAge = !filters?.age || item.age === filters.age
      const isSameSize = !filters?.size || item.size === filters.size
      const isSameEnergy = !filters?.energy || item.energy === filters.energy
      const isSameIndependence =
        !filters?.independence || item.independence === filters.independence

      return (
        isSameCity &&
        isSameAge &&
        isSameSize &&
        isSameEnergy &&
        isSameIndependence
      )
    })
  }

  async getPetById(petId: string) {
    return this.items.find((item) => item.id === petId) || null
  }
}
