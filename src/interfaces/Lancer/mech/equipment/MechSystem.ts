import type { SystemType } from "src/classes/Lancer/enums";
import type { IMechEquipmentData } from "./MechEquipment";



export interface IMechSystemData extends IMechEquipmentData {
  type: SystemType
}