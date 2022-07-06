import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { CompanionsService } from '../companions.service'
import { Companion } from '../entities/companion.entity'
// import { Cache } from 'cache-manager'

type uuid = string

type CompanionContext = {
  companionId: uuid
}

@Injectable()
export class CompanionContextInterceptor implements NestInterceptor<Companion> {
  constructor(
    private companionsService: CompanionsService // @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler<Companion>) {
    const gqlContext = GqlExecutionContext.create(context)

    const { userId } = gqlContext.getContext().req.user

    // let savedCompanion = await this.cacheManager.get<CompanionContext>(userId)

    // if (!savedCompanion) {
    //   const companion = await this.companionsService.findOneByUser(userId)

    //   savedCompanion = await this.cacheManager.set<CompanionContext>(userId, {
    //     companionId: companion._id,
    //   })
    // }

    const companion = await this.companionsService.findOneByUser(userId)

    gqlContext.getContext().req.companion = { companionId: companion._id }

    return next.handle()
  }
}
