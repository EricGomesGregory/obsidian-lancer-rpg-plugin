import type { ITagData } from "../../interfaces"
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