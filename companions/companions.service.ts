import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, PipelineStage } from 'mongoose'
import { ObjectID } from 'typeorm'
import { Companion, CompanionDocument } from './entities/companion.entity'

type uuid = string

type orPromise<T> = Promise<T> | T

interface ICompanionsService {
  registerCompanion: (userId: uuid) => orPromise<Companion>

  addSingleRoute: (companionId: uuid, routeId: uuid) => orPromise<Companion>

  removeRoute: (companionId: uuid) => orPromise<Companion>

  deregister: (companionId: uuid) => orPromise<Companion>

  deregisterByUser: (userId: uuid) => orPromise<Companion>

  findAll: () => orPromise<Companion[]>

  findOne: (id: uuid) => orPromise<Companion>

  findOneByUser: (userId: uuid) => orPromise<Companion>

  checkCompanionsExist(companionsIds: uuid[]): orPromise<boolean>
}

@Injectable()
export class CompanionsService implements ICompanionsService {
  constructor(
    @InjectModel(Companion.name)
    private companionModel: Model<CompanionDocument>
  ) {}

  async registerCompanion(userId: string): Promise<Companion> {
    const companion = await this.companionModel.create({ userId })

    return companion
  }

  async addSingleRoute(companionId: uuid, routeId: uuid): Promise<Companion> {
    const companion = await this.companionModel.findByIdAndUpdate(companionId, {
      route: routeId,
    })

    return companion
  }

  async removeRoute(companionId: uuid): Promise<Companion> {
    const companion = await this.companionModel.findByIdAndUpdate(companionId, {
      $unset: {
        route: '',
      },
    })

    return companion
  }

  async deregister(companionId: uuid): Promise<Companion> {
    const companion = await this.companionModel.findByIdAndRemove(companionId, {
      populate: 'route',
    })

    return companion
  }

  async deregisterByUser(userId: uuid): Promise<Companion> {
    const companion = await this.companionModel.findOneAndRemove(
      { userId },
      { populate: 'route' }
    )

    return companion
  }

  async findAll(): Promise<Companion[]> {
    const companions = await this.companionModel.find(
      {},
      {},
      { populate: 'route' }
    )

    return companions
  }

  async findOne(id: uuid): Promise<Companion> {
    const companion = await this.companionModel.findById(id)

    return companion
  }

  async findOneByUser(userId: uuid): Promise<Companion> {
    const companion = await this.companionModel.findOne({ userId })

    return companion
  }

  async checkCompanionsExist(companionsIds: uuid[]): Promise<boolean> {
    const aggregationPipeline: PipelineStage[] = [
      {
        $group: {
          _id: null,
          allCompanionsIds: {
            $push: {
              $toString: '$_id',
            },
          },
        },
      },
      {
        $replaceWith: {
          isSubset: {
            $setIsSubset: [companionsIds, '$allCompanionsIds'],
          },
        },
      },
    ]

    type aggregationReturnValue = {
      isSubset: boolean
    }

    const [{ isSubset }] =
      await this.companionModel.aggregate<aggregationReturnValue>(
        aggregationPipeline
      )

    return isSubset
  }
}
