import { OrgRepository } from '@/repositories/org-repository'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists'

interface CreateOrgUseCaseRequest {
  name: string
  email: string
  cep: string
  address: string
  city: string
  state: string
  phone_number: string
  password: string
}

export class CreateOrgUseCase {
  constructor(private readonly orgRepository: OrgRepository) {}

  async execute({
    name,
    email,
    cep,
    address,
    city,
    state,
    phone_number,
    password,
  }: CreateOrgUseCaseRequest) {
    const orgAlreadyExists = await this.orgRepository.findByEmail(email)

    if (orgAlreadyExists) {
      throw new OrgAlreadyExistsError()
    }

    const password_hash = await hash(password, 8)

    const org = await this.orgRepository.save({
      name,
      email,
      cep,
      address,
      city,
      state,
      phone_number,
      password_hash,
    })

    return { org }
  }
}
