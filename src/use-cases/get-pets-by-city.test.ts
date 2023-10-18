import { InMemoryOrgRepository } from '@/repositories/in-memory/org-repository'
import { InMemoryPetRepository } from '@/repositories/in-memory/pet-repository'
import { GetPetsByCityUseCase } from './get-pets-by-city'

let inMemoryOrgRepository: InMemoryOrgRepository
let inMemoryPetRepository: InMemoryPetRepository
let sut: GetPetsByCityUseCase

beforeEach(() => {
  inMemoryOrgRepository = new InMemoryOrgRepository()
  inMemoryPetRepository = new InMemoryPetRepository(inMemoryOrgRepository)
  sut = new GetPetsByCityUseCase(inMemoryPetRepository)
})

it('should be list pets per city', async () => {
  const org = await inMemoryOrgRepository.save({
    name: 'any-name',
    email: 'any-email',
    city: 'any-city',
  } as any)

  const { id } = await inMemoryPetRepository.save({
    name: 'any-name',
    org_id: org.id,
  } as any)

  await inMemoryPetRepository.save({
    name: 'any-name',
    org_id: (
      await inMemoryOrgRepository.save({
        name: 'any-name',
        email: 'any-email',
        city: 'another-city',
      } as any)
    ).id,
  } as any)

  const { pets } = await sut.execute({
    city: 'any-city',
  })

  expect(pets).toEqual([
    {
      id,
      name: 'any-name',
      org_id: org.id,
    },
  ])
})

it('should be list pets per city and age', async () => {
  const org = await inMemoryOrgRepository.save({
    name: 'any-name',
    email: 'any-email',
    city: 'any-city',
  } as any)

  const { id } = await inMemoryPetRepository.save({
    name: 'any-name',
    org_id: org.id,
    age: 'ADULT',
  } as any)

  await inMemoryPetRepository.save({
    name: 'any-name',
    org_id: org.id,
    age: 'PUPPY',
  } as any)

  const { pets } = await sut.execute({
    city: 'any-city',
    filters: {
      age: 'ADULT',
    },
  })

  expect(pets).toEqual([
    {
      id,
      name: 'any-name',
      org_id: org.id,
      age: 'ADULT',
    },
  ])
})

it('should be list pets per city, age and size', async () => {
  const org = await inMemoryOrgRepository.save({
    name: 'any-name',
    email: 'any-email',
    city: 'any-city',
  } as any)

  const { id } = await inMemoryPetRepository.save({
    name: 'any-name',
    org_id: org.id,
    age: 'ADULT',
    size: 'SMALL',
  } as any)

  await inMemoryPetRepository.save({
    name: 'any-name',
    org_id: org.id,
    age: 'ADULT',
    size: 'MEDIUM',
  } as any)

  const { pets } = await sut.execute({
    city: 'any-city',
    filters: {
      age: 'ADULT',
      size: 'SMALL',
    },
  })

  expect(pets).toEqual([
    {
      id,
      name: 'any-name',
      org_id: org.id,
      age: 'ADULT',
      size: 'SMALL',
    },
  ])
})
