import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a org', async () => {
    // name,
    //   email,
    //   password,
    //   cep,
    //   address,
    //   city,
    //   state,
    //   phone_number,

    const response = await request(app.server).post('/orgs').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cep: '12345678',
      address: 'Rua John Doe',
      city: 'John Doe',
      state: 'John Doe',
      phone_number: '11900001111',
    })

    expect(response.statusCode).toEqual(201)
  })
})
