import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model, ObjectId, PopulateOptions } from 'mongoose'
import { SingleRoute } from 'src/routes/entities/single-route.entity'
import { Companion, CompanionDocument } from '../entities/companion.entity'

type operationOptions = {
  withPopulation: boolean
}

const population: PopulateOptions[] = [
  {
    path: 'route',
    model: SingleRoute.name,
  },
]

@Injectable()
export class CompanionsRepository {
  constructor(
    @InjectModel(Companion.name)
    private companionModel: Model<CompanionDocument>
  ) {}

  async create(createEntityData: unknown): Promise<Companion> {
    const entity = new this.companionModel(createEntityData)

    return entity.save()
  }

  async findOne(
    companionFilterQuery: FilterQuery<Companion>
  ): Promise<Companion> {
    return this.companionModel.findOne(companionFilterQuery)
  }

  async find(
    companionFilterQuery: FilterQuery<Companion>
  ): Promise<Companion[]> {
    return this.companionModel.find(companionFilterQuery)
  }

  async findByIdAndRemove(id: ObjectId) {
    return this.companionModel.findByIdAndRemove(id)
  }

  async findByIdAndUpdate() {}
}
