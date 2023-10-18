import { InMemoryOrgRepository } from '@/repositories/in-memory/org-repository'
import { CreateOrgUseCase } from './create-org'
import { compareSync } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists'

let inMemoryOrgRepository: InMemoryOrgRepository
let sut: CreateOrgUseCase

beforeEach(() => {
  inMemoryOrgRepository = new InMemoryOrgRepository()
  sut = new CreateOrgUseCase(inMemoryOrgRepository)
})

it('should be create a new org', async () => {
  const { org } = await sut.execute({
    name: 'any_name',
    address: 'any_address',
    cep: 'any_cnpj',
    city: 'any_city',
    state: 'any_state',
    phone_number: 'any_phone_number',
    email: 'any_email',
    password: 'any_password',
  })

  expect(org).toHaveProperty('id')
  expect(org).toHaveProperty('name', 'any_name')
})

it('should be to hash password correctly', async () => {
  const { org } = await sut.execute({
    name: 'any_name',
    address: 'any_address',
    cep: 'any_cnpj',
    city: 'any_city',
    state: 'any_state',
    phone_number: 'any_phone_number',
    email: 'any_email',
    password: 'any_password',
  })

  expect(org).toHaveProperty('password_hash')
  expect(compareSync('any_password', org.password_hash)).toBe(true)
})

it('should be throw if org already exists', async () => {
  const email = 'any_email'

  inMemoryOrgRepository.items.push({ email } as any)

  const promise = sut.execute({ email } as any)

  await expect(promise).rejects.toThrowError(OrgAlreadyExistsError)
})
