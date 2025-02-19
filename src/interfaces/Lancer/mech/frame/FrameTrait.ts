import type { IBonusData, ICounterData, IDeployableData, ISynergyData, } from "../../common"
import type { IActionData } from "../../Action"
import type { Duration } from "../../enums"




export interface IFrameTraitData {
  name: string
  description: string
  use?: Duration
  actions?: IActionData[]
  bonuses?: IBonusData[]
  synergies?: ISynergyData[]
  deployables?: IDeployableData[]
  counters?: ICounterData[]
  integrated?: string[]
  special_equipment?: string[]
}