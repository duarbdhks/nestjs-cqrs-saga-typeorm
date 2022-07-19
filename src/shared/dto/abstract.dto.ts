import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class AbstractDTO {
  @Expose()
  create_at: Date

  @Expose()
  updated_at?: Date
}
