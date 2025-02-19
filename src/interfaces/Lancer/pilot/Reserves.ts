import type { IActionData } from "../Action"
import type { IBonusData } from "../common"
import type { ICounterData } from "../common/Counter"
import type { IDeployableData } from "../common/Deployable"
import type { ISynergyData } from "../common/Synergy"



export interface IReserveData {
  id: string
  type?: string
  name?: string
  label?: string
  description?: string
  resource_name: string
  resource_note: string
  resource_cost: string
  used: boolean
  consumable: boolean
  actions?: IActionData[]
  bonuses?: IBonusData[]
  synergies?: ISynergyData[]
  deployables?: IDeployableData[]
  counters?: ICounterData[]
  integrated?: string[]
  special_equipment?: string[]
}