import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isBefore', async: false })
export class IsBeforeConstraint implements ValidatorConstraintInterface {
  validate(propertyValue: string, args: ValidationArguments) {
    return args.constraints.reduce(
      (isValid, constraint) =>
        isValid && propertyValue < args.object[constraint],
    );
  }

  defaultMessage(args: ValidationArguments) {
    return `"${args.property}" must be before "${args.constraints[0]}"`;
  }
}
