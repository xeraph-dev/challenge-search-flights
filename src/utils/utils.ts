import _ from 'lodash'
import { DateTime } from 'luxon'

export type Camelize = (obj: object) => object
export const camelize: Camelize = obj =>
  Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [
      _.camelCase(k),
      typeof v === 'object' && v !== null && !Array.isArray(v) ? camelize(v) : v,
    ]),
  )

export const DATE_FORMAT = 'yyyy-MM-dd'

export type DateToSeconds = (date: string) => number
export const dateToSeconds: DateToSeconds = date => Math.round(DateTime.fromFormat(date, DATE_FORMAT).toSeconds())

export type FormatDate = (date: number) => string
export const formatDate: FormatDate = date => DateTime.fromMillis(date).toFormat(DATE_FORMAT)
