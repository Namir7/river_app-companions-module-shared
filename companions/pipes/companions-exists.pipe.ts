import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common'
import { CompanionsService } from '../companions.service'

type uuid = string

@Injectable()
export class CompanionsExistPipe implements PipeTransform {
  constructor(private companionsService: CompanionsService) {}

  async transform(value: uuid[], metadata: ArgumentMetadata) {
    const isValid = await this.companionsService.checkCompanionsExist(value)

    if (!isValid) {
      throw new BadRequestException(`invalid receivers' ids`)
    }

    return value
  }
}
