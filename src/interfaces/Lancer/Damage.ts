import type { DamageType } from "./enums"




export interface IDamageData {
  type: DamageType
  val: string | number
  override?: boolean
  bonus?: string | number
}