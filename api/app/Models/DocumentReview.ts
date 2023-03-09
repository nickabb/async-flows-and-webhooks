import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class DocumentReview extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public documentUrl: string

  @column()
  public agentId: string

  @column()
  public documentId: string

  @column()
  public documentStatus: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
