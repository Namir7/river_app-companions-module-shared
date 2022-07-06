import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

type uuid = string

export type CompanionContext = {
  companionId: uuid
} | null

export const CompanionContext = createParamDecorator(
  (_: unknown, executionContext: ExecutionContext): CompanionContext => {
    const gqlContext = GqlExecutionContext.create(executionContext)

    const companion = gqlContext.getContext().req.companion

    return companion
  }
)
