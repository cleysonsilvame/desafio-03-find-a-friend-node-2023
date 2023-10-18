import { InMemoryPetRepository } from '@/repositories/in-memory/pet-repository'
import { GetPetByIdUseCase } from './get-pet-by-id'
import { PetNotFoundError } from './errors/pet-not-found'

let inMemoryPetRepository: InMemoryPetRepository
let sut: GetPetByIdUseCase

beforeEach(() => {
  inMemoryPetRepository = new InMemoryPetRepository()
  sut = new GetPetByIdUseCase(inMemoryPetRepository)
})

it('should be show pet', async () => {
  const { id } = await inMemoryPetRepository.save({
    name: 'any-name',
  } as any)

  const { pet } = await sut.execute({
    petId: id,
  })

  expect(pet).toEqual({
    id,
    name: 'any-name',
  })
})

it('should not be show pet', async () => {
  const promise = sut.execute({
    petId: 'any-id',
  })

  await expect(promise).rejects.toThrowError(PetNotFoundError)
})
