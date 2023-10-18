import { PetRepository } from '@/repositories/pet-repository'
import { Age, Size, Energy, Independence } from '@prisma/client'

interface GetPetsByCityUseCaseRequest {
  city: string
  filters?: {
    age?: Age
    size?: Size
    energy?: Energy
    independence?: Independence
  }
}

export class GetPetsByCityUseCase {
  constructor(private readonly petRepository: PetRepository) {}

  async execute({ city, filters }: GetPetsByCityUseCaseRequest) {
    const pets = await this.petRepository.getByCity(city, filters)

    return { pets }
  }
}
