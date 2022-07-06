import { ISingleRoute } from 'src/routes/interfaces/single-route.interface'

type uuid = string

export interface ICompanion {
  readonly userId: uuid
  
  readonly route: ISingleRoute
}
