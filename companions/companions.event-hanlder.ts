import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { Cache } from 'cache-manager'
import { RoutesEvents } from 'src/routes/types/events-names.enum'
import { SingleCreatedEventPayload } from 'src/routes/types/single-created-payload.type'
import { SingleRemovedEventPayload } from 'src/routes/types/single-removed-payload.type'
import { CompanionsService } from './companions.service'

@Injectable()
export class CompanionsEventHandler {
  constructor(
    private companionsService: CompanionsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  @OnEvent(RoutesEvents.SINGLE_CREATED)
  handleSingleRouteCreated(payload: SingleCreatedEventPayload) {
    const { companionId, routeId } = payload

    this.companionsService.addSingleRoute(companionId, routeId)
  }

  @OnEvent(RoutesEvents.SINGLE_REMOVED)
  handleSingleRouteRemoved(payload: SingleRemovedEventPayload) {
    const { companionId } = payload

    this.companionsService.removeRoute(companionId)
  }
}
