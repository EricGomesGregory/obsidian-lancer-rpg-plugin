import type { WeaponSize, WeaponType } from "../../enums"
import type { IDamageData } from "../../Damage"
import type { ITagData } from "../../interfaces"
import type { IRangeData } from "../../Range"
import type { ILicensedItemData } from "../../pilot"




export interface IMechEquipmentData extends ILicensedItemData {
  sp: number
  tags: ITagData[]
  effect: string
  talent_item?: boolean
  frame_id?: boolean
  // TODO: expand
  ammo?: any[]
  no_mods?: boolean
  no_bonuses?: boolean
  no_synergies?: boolean
}

export interface IWeaponModData extends IMechEquipmentData {
  allowed_types?: WeaponType[]
  allowed_sizes?: WeaponSize[]
  restricted_types?: WeaponType[]
  restricted_sizes?: WeaponSize[]
  added_tags?: ITagData[]
  added_damage?: IDamageData[]
  added_range?: IRangeData[]
}