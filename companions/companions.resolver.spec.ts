import { CanActivate } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard'
import { CompanionsResolver } from './companions.resolver'
import { CompanionsService } from './companions.service'

const mockData = {
  context: {
    req: {
      user: {
        userId: '37c0de4c-1730-401e-8eb4-07a6a316d1f7',
      },
    },
  },
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

describe('CompanionsResolver', () => {
  let resolver: CompanionsResolver

  const mockJwtAuthGuard: CanActivate = { canActivate: jest.fn(() => true) }
  const mockCompanionsService = {
    register: jest.fn((userId, route) => ({
      userId,
      route: route,
    })),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanionsResolver, CompanionsService],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtAuthGuard)

      .overrideProvider(CompanionsService)
      .useValue(mockCompanionsService)

      .compile()

    resolver = module.get<CompanionsResolver>(CompanionsResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  // it('should register new companion', () => {
  //   const { context, route } = mockData

  //   expect(resolver.register(context, route)).toEqual({
  //     userId: '37c0de4c-1730-401e-8eb4-07a6a316d1f7',
  //     route,
  //   })
  // })
})
