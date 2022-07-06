import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CompnaionsEventEmitter } from './companions.event-emitter'
import { CompanionsEventHandler } from './companions.event-hanlder'
import { CompanionsResolver } from './companions.resolver'
import { CompanionsService } from './companions.service'
import { Companion, CompanionSchema } from './entities/companion.entity'
import { CompanionContextInterceptor } from './interceptors/bind-companion.interceptor'
import { CompanionsEmitterInterceptor } from './interceptors/companions-emitter.interceptor'
import { CompanionsRepository } from './repositories/companions.repository'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Companion.name, schema: CompanionSchema },
    ]),
  ],
  providers: [
    CompanionsResolver,
    CompanionsService,
    CompanionsRepository,
    CompanionContextInterceptor,

    CompanionsEventHandler,
    CompnaionsEventEmitter,
    CompanionsEmitterInterceptor,
  ],
  exports: [CompanionsService, CompanionContextInterceptor],
})
export class CompanionsModule {}
