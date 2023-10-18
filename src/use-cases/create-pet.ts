import { PetRepository } from '@/repositories/pet-repository'
import { Age, Energy, Independence, Size } from '@prisma/client'

interface CreatePetUseCaseRequest {
  name: string
  about: string
  age: Age
  size: Size
  energy: Energy
  independence: Independence
  environment: string
  orgId: string
  adoptionRequirements: string[]
  petPictures: string[]
}

export class CreatePetUseCase {
  constructor(private readonly petRepository: PetRepository) {}

  async execute({
    name,
    about,
    age,
    size,
    energy,
    environment,
    independence,
    orgId,
    adoptionRequirements,
    petPictures,
  }: CreatePetUseCaseRequest) {
    const pet = await this.petRepository.save({
      name,
      about,
      age,
      size,
      energy,
      independence,
      environment,
      org_id: orgId,

      AdoptionRequirements: {
        createMany: {
          data: adoptionRequirements.map((requirement) => ({
            description: requirement,
          })),
        },
      },

      PetPictures: {
        createMany: {
          data: petPictures.map((picture) => ({
            image_url: picture,
          })),
        },
      },
    })

    return { pet }
  }
}
