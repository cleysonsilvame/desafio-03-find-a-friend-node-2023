import { PetRepository } from '@/repositories/pet-repository'
import { PetNotFoundError } from './errors/pet-not-found'

interface GetPetByIdUseCaseRequest {
  petId: string
}

export class GetPetByIdUseCase {
  constructor(private readonly petRepository: PetRepository) {}

  async execute({ petId }: GetPetByIdUseCaseRequest) {
    const pet = await this.petRepository.getPetById(petId)

    if (!pet) throw new PetNotFoundError()

    return { pet }
  }
}
