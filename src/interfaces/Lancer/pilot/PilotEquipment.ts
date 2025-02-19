import type { ICompendiumItemData } from "../CompendiumItem"
import type { ITagData } from "../interfaces"


export interface IPilotEquipmentData extends ICompendiumItemData {
  type?: string
  tags: ITagData[]
  effect?: string
}