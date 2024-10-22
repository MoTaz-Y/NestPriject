import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateUser } from './createUser.dto';

export class UpdateUser extends PartialType(OmitType(CreateUser, ['password'] as const)) {
  //name ?, email ?
}
