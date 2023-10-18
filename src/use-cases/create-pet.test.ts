import { InMemoryPetRepository } from '@/repositories/in-memory/pet-repository'
import { CreatePetUseCase } from './create-pet'

let inMemoryPetRepository: InMemoryPetRepository
let sut: CreatePetUseCase

beforeEach(() => {
  inMemoryPetRepository = new InMemoryPetRepository()
  sut = new CreatePetUseCase(inMemoryPetRepository)
})

it('should be create a new pet', async () => {
  const { pet } = await sut.execute({
    name: 'any_name',
    about: 'any_about',
    age: 'PUPPY',
    size: 'SMALL',
    energy: 'LOW',
    independence: 'LOW',
    environment: 'any_environment',
    orgId: 'any_org_id',

    adoptionRequirements: ['any_requirement'],
    petPictures: ['any_picture'],
  })

  expect(pet).toHaveProperty('id')
  expect(pet).toHaveProperty('name', 'any_name')

  expect(inMemoryPetRepository.adoptionRequirements).toHaveLength(1)
  expect(inMemoryPetRepository.petPictures).toHaveLength(1)

  expect(inMemoryPetRepository.adoptionRequirements[0]).toHaveProperty('id')
  expect(inMemoryPetRepository.adoptionRequirements[0]).toHaveProperty(
    'pet_id',
    pet.id,
  )

  expect(inMemoryPetRepository.petPictures[0]).toHaveProperty('id')
  expect(inMemoryPetRepository.petPictures[0]).toHaveProperty('pet_id', pet.id)
})
