import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable, tap } from 'rxjs'
import { CompnaionsEventEmitter } from '../companions.event-emitter'
import { Companion } from '../entities/companion.entity'
import { CompanionsEvents } from '../types/events-names.enum'

@Injectable()
export class CompanionsEmitterInterceptor implements NestInterceptor {
  constructor(
    private companionsEventEmitter: CompnaionsEventEmitter,
    private reflector: Reflector
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<any> | Promise<Observable<any>> {
    const event: CompanionsEvents = this.reflector.get<CompanionsEvents>(
      'event',
      context.getHandler()
    )

    switch (event) {
      case CompanionsEvents.COMPANION_DEREGISTER:
        return next
          .handle()
          .pipe(
            tap((companion: Companion) =>
              this.companionsEventEmitter.emitCompanionDeregistered(
                companion._id,
                companion.userId
              )
            )
          )

      default:
        return next.handle()
    }
  }
}
