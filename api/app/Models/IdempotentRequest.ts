import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class IdempotentRequest extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public idempotencyKey: string

  @column()
  public resourcePath: string

  @column()
  public responseBody: string

  @column()
  public responseStatusCode: number

  @column.dateTime()
  public lockedAt: DateTime
}
