import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes } from 'mongoose'
import { SingleRoute } from 'src/routes/entities/single-route.entity'

export type CompanionDocument = Companion & Document

type uuid = string

@Schema()
@ObjectType()
export class Companion {
  /* mongo default index */
  @Field(() => ID)
  _id: uuid

  @Prop({ required: true, unique: true })
  @Field(() => ID)
  userId: uuid

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: SingleRoute.name,
    unique: true,
    sparse: true,
  })
  @Field(() => SingleRoute, { nullable: true })
  route: SingleRoute
}

export const CompanionSchema = SchemaFactory.createForClass(Companion)
