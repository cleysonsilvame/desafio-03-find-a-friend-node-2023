import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

let token: string

describe('Get Pet by City (e2e)', () => {
  beforeAll(async () => {
    await app.ready()

    await request(app.server).post('/orgs').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cep: '12345678',
      address: 'Rua John Doe',
      city: 'John Doe',
      state: 'John Doe',
      phone_number: '11900001111',
    })

    const { body } = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    token = body.token
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a pet by city', async () => {
    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'John Doe Pet',
        about: 'John Doe Pet',
        age: 'PUPPY',
        size: 'SMALL',
        energy: 'VERY_LOW',
        independence: 'LOW',
        environment: 'John Doe Pet',
        adoptionRequirements: ['John Doe Pet'],
        petPictures: ['pet/picture'],
      })

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'John Doe Pet',
        about: 'John Doe Pet',
        age: 'PUPPY',
        size: 'MEDIUM',
        energy: 'VERY_LOW',
        independence: 'LOW',
        environment: 'John Doe Pet',
        adoptionRequirements: ['John Doe Pet'],
        petPictures: ['pet/picture'],
      })

    const response = await request(app.server)
      .get('/pets/John Doe')
      .query({
        size: 'MEDIUM',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      pets: [
        expect.objectContaining({
          name: 'John Doe Pet',
          about: 'John Doe Pet',
          age: 'PUPPY',
          size: 'MEDIUM',
          energy: 'VERY_LOW',
          independence: 'LOW',
          environment: 'John Doe Pet',
        }),
      ],
    })
  })
})
