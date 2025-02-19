import type { IActionData } from "../Action"
import type { IBonusData, ICounterData, IDeployableData, ISynergyData } from "../common"
import type { ICompendiumItemData } from "../CompendiumItem"



export interface ICoreBonusData extends ICompendiumItemData {
  source: string
  effect: string
  mounted_effect?: string
  actions?: IActionData[]
  bonuses?: IBonusData[]
  synergies?: ISynergyData[]
  deployables?: IDeployableData[]
  integrated?: string[]
  special_equipment?: string[]
  counters?: ICounterData[]
}