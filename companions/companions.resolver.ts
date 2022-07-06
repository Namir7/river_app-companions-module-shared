import { UseGuards, UseInterceptors } from '@nestjs/common'
import { Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserContext } from 'src/auth/decorators/user.decorator'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard'
import { Event } from '../common/decorators/event.decorator'
import { CompanionsService } from './companions.service'
import { Companion } from './entities/companion.entity'
import { CompanionsEmitterInterceptor } from './interceptors/companions-emitter.interceptor'
import { CompanionsEvents } from './types/events-names.enum'

@Resolver()
@UseGuards(JwtAuthGuard)
@UseInterceptors(CompanionsEmitterInterceptor)
export class CompanionsResolver {
  constructor(private companionsService: CompanionsService) {}

  @Mutation(() => Companion, { name: 'registerCompanion' })
  register(@UserContext() user: UserContext): Promise<Companion> {
    const { userId } = user

    return this.companionsService.registerCompanion(userId)
  }

  @Mutation(() => Companion, { name: 'deregisterCompanion' })
  @Event(CompanionsEvents.COMPANION_DEREGISTER)
  async deregister(@UserContext() user: UserContext): Promise<Companion> {
    const { userId } = user

    return this.companionsService.deregisterByUser(userId)
  }

  @Query(() => [Companion])
  companions(): Promise<Companion[]> {
    return this.companionsService.findAll()
  }
}
