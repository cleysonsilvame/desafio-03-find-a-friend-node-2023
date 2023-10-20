import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import path from 'node:path'
import fs from 'node:fs/promises'

let token: string

describe('Upload Image (e2e)', () => {
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

  it('should be able to upload image', async () => {
    const response = await request(app.server)
      .post('/pets/pictures/upload')
      .set('Authorization', `Bearer ${token}`)
      .attach('images', Buffer.from('any-image'), {
        filename: 'picture.jpg',
        contentType: 'image/jpg',
      })

    expect(response.statusCode).toEqual(201)

    expect(response.body).toEqual({
      files: [
        expect.objectContaining({
          url: expect.any(String),
        }),
      ],
    })

    const tmpFolder = path.resolve(process.cwd(), 'tmp')

    const [filename] = response.body.files[0].url.split('/').reverse()
    const file = path.resolve(tmpFolder, filename)

    expect(await fs.stat(file)).toBeTruthy()

    await fs.rm(file)
  })
})
