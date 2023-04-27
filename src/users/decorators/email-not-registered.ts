import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { User } from '../entities/user.entity';

@ValidatorConstraint({ async: true, name: 'unique' })
@Injectable()
export class IsEmailNotRegister implements ValidatorConstraintInterface {
  constructor(private dataSource: DataSource) {}

  async validate(email: string) {
    const user = await this.dataSource.getRepository(User).countBy({ email });

    return !user;
  }
}

export const EmailNotRegistered = (validationOptions?: ValidationOptions) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailNotRegister,
    });
  };
};
