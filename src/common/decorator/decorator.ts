import { registerDecorator, ValidationOptions } from 'class-validator'

const isInteger = (value: any) => (typeof value === 'number') && Number.isSafeInteger(+value)
const isPositiveInteger = (value: any) => isInteger(value) && (+value > 0)
const isString = (value: any) => typeof value === 'string'

export const IsID = (validationOptions?: ValidationOptions) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isID',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          const isCheckArray = validationOptions?.each && Array.isArray(value)
          return isCheckArray ? value.every((v) => isPositiveInteger(v)) : isPositiveInteger(value)
        },
        defaultMessage(): string {
          return `$property must satisfy ID condition(is every elements are positive integer)`
        },
      },
    })
  }
}
