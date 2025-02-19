import type { SystemType } from "src/classes/Lancer/enums"
import type { IMechEquipmentData } from "./MechEquipment"
import type { ITagData } from "src/classes/Lancer/interfaces"



export interface ISystemModData extends IMechEquipmentData {
  allowed_types?: SystemType[]
  restricted_types?: SystemType[]
  added_tags?: ITagData[]
}