import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  token: string;

  @Prop({ required: true })
  role: string;

//   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Address' })
//   addressId: Address;
}

export const userSchema = SchemaFactory.createForClass(User);
