import type { DamageType, RangeType, WeaponSize, WeaponType } from "../enums"



export interface IBonusData {
  id: string
  val: string | number | string[]
  damage_types?: DamageType[]
  range_types?: RangeType[]
  weapon_types?: WeaponType[]
  weapon_sizes?: WeaponSize[]
  overwrite?: boolean
  replace?: boolean
}