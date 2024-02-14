import { ApiProperty } from '@nestjs/swagger';
import { TokenSymbols, tokenSymbols } from '../types/tokens';
import {
  IsIn,
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export function IsArrayOfTokens(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsArrayOfTokens',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsArrayOfTokensConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'IsArrayOfTokens' })
export class IsArrayOfTokensConstraint implements ValidatorConstraintInterface {
  validate(array: TokenSymbols[]) {
    return array.every((item) => tokenSymbols.includes(item));
  }
}

export class GetPrice {
  @ApiProperty({
    description: `Supported tokens: ${tokenSymbols.reduce(
      (acc, curr) => `${acc} ${curr},`,
      '',
    )}`,
  })
  @IsIn(tokenSymbols)
  token: TokenSymbols;
}

export class GetPricesBulk {
  @ApiProperty({
    description: `Supported tokens: ${tokenSymbols.reduce(
      (acc, curr) => `${acc} ${curr},`,
      '',
    )}`,
  })
  @IsArrayOfTokens({ message: 'Array values must be supported tokens' })
  tokens: TokenSymbols[];
}
