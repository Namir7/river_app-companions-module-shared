import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { CompanionsService } from './companions.service'
import { Companion } from './entities/companion.entity'

const mockData = {
  userId: '37c0de4c-1730-401e-8eb4-07a6a316d1f7',

  route: {
    source: {
      coords: {
        lat: 13.55,
        lng: 12.78,
      },
    },
    destination: {
      coords: {
        lat: 13.55,
        lng: 12.78,
      },
    },
  },
}

describe('CompanionsService', () => {
  let service: CompanionsService

  const mockCompanionModel = {
    create: jest
      .fn()
      .mockImplementation((companion) =>
        Promise.resolve({ _id: Date.now(), ...companion })
      ),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanionsService,
        {
          provide: getModelToken(Companion.name),
          useValue: mockCompanionModel,
        },
      ],
    }).compile()

    service = module.get<CompanionsService>(CompanionsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  // it('should register new compaion and return that', async () => {
  //   const { userId, route } = mockData

  //   expect(await service.register(userId, route)).toEqual({
  //     _id: expect.any(Number),
  //     userId,
  //     route,
  //   })
  // })
})
