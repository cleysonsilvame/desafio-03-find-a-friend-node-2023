import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
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

    const response = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('Path=/; HttpOnly; Secure; SameSite=Strict'),
    ])
  })

  it('should not be able to authenticate with invalid credentials', async () => {
    const response = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: 'wrong-password',
    })

    expect(response.status).toEqual(400)
  })
})
