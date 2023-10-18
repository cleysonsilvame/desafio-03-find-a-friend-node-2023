import { InMemoryOrgRepository } from '@/repositories/in-memory/org-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { hash } from 'bcryptjs'

let orgRepository: InMemoryOrgRepository
let sut: AuthenticateUseCase

beforeEach(() => {
  orgRepository = new InMemoryOrgRepository()
  sut = new AuthenticateUseCase(orgRepository)
})

it('should be able to authenticate', async () => {
  await orgRepository.save({
    email: 'johndoe@example.com',
    password_hash: await hash('123456', 6),
  } as any)

  const { org } = await sut.execute({
    email: 'johndoe@example.com',
    password: '123456',
  })

  expect(org.id).toEqual(expect.any(String))
})

it('should not be able to authenticate with wrong email', async () => {
  const promise = sut.execute({
    email: 'johndoe@example.com',
    password: '123456',
  })

  await expect(promise).rejects.toBeInstanceOf(InvalidCredentialsError)
})

it('should not be able to authenticate with wrong email', async () => {
  await orgRepository.save({
    email: 'johndoe@example.com',
    password_hash: await hash('123456', 6),
  } as any)

  const promise = sut.execute({
    email: 'johndoe@example.com',
    password: '123123',
  })

  await expect(promise).rejects.toBeInstanceOf(InvalidCredentialsError)
})
