import { UnauthorizedException } from '@nestjs/common'

export const transformInt = ({ value }): number => +value

export const transformIntArray = ({ value }): number[] => value.map((v) => transformInt({ value: v }))

export const transformFloat = ({ value }): number => value ? parseFloat(value) : value

export const transformDate = ({ value }): Date =>
  Number.isInteger(transformInt({ value })) ? new Date(transformInt({ value })) : new Date(value)

export const transformUpperCase = ({ value }): string => value?.toUpperCase()

export const transformEncodeUri = ({ value }): string => encodeURI(value)

export const transformSplitComma = ({ value }): string[] => value && value.split(',')

export const transformSplitIntArray = ({ value }): number[] => {
  return (value && !Array.isArray(value))
    ? transformIntArray({ value: transformSplitComma({ value }) }).filter(Number.isFinite)
    : value
}
