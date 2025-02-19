import type { RangeType } from "./enums"




export interface IRangeData {
  type: RangeType
  val: number
  override?: boolean
  bonus?: number
}