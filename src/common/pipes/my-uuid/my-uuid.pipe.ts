import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { validate as isUUID } from 'uuid';

@Injectable()
export class MyUuidPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('value', value);
    console.log('metadata', metadata);

    if (!isUUID(value)) {
      throw new BadRequestException(`invalid ${metadata.data} should be uuid`);
    }

    return value;
  }
}
