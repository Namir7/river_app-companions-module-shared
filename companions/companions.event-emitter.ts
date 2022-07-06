import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { CompanionDeregisterEventPayload } from './types/companion-deregister-payload.type'
import { CompanionsEvents } from './types/events-names.enum'

type uuid = string

@Injectable()
export class CompnaionsEventEmitter {
  constructor(private eventEmitter: EventEmitter2) {}

  emitCompanionDeregistered(companionId: uuid, userId: uuid) {
    this.eventEmitter.emit<CompanionDeregisterEventPayload>(
      CompanionsEvents.COMPANION_DEREGISTER,
      { companionId, userId }
    )
  }
}
