import type { IActionData } from "../../Action"
import type { IBonusData, ICounterData, IDeployableData, ISynergyData } from "../../common"
import type { IDamageData } from "../../Damage"
import type { WeaponSize, WeaponType } from "../../enums"
import type { IRangeData } from "../../Range"
import type { IMechEquipmentData } from "./MechEquipment"




export interface IMechWeaponData extends IMechEquipmentData {
  mount: WeaponSize
  type: WeaponType
  skirmish?: boolean
  barrage?: boolean
  cost?: number
  no_attack?: boolean
  no_core_bonus?: boolean
  on_attack?: string
  on_hit?: string
  on_crit?: string
  damage?: IDamageData[]
  range?: IRangeData[]
  profiles?: IWeaponProfileData[]
  selected_profile: number
  mod_type_override?: WeaponType
  mod_size_override?: WeaponSize
}

interface IWeaponProfileData {
  name: string
  effect?: string
  skirmish?: boolean
  barrage?: boolean
  cost?: number
  on_attack?: string
  on_hit?: string
  on_crit?: string
  damage?: IDamageData[]
  range?: IRangeData[]
  actions?: IActionData[]
  bonuses?: IBonusData[]
  synergies?: ISynergyData[]
  deployables?: IDeployableData[]
  counters?: ICounterData[]
  integrated?: string[]
  special_equipment?: string[]
}