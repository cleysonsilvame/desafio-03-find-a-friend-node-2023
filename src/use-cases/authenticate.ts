import { OrgRepository } from '@/repositories/org-repository'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { compare } from 'bcryptjs'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

export class AuthenticateUseCase {
  constructor(private orgRepository: OrgRepository) {}

  async execute({ email, password }: AuthenticateUseCaseRequest) {
    const org = await this.orgRepository.findByEmail(email)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const doestPasswordMatches = await compare(password, org.password_hash)

    if (!doestPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      org,
    }
  }
}
