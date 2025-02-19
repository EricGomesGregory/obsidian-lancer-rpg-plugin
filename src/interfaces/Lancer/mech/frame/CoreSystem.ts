import type { IActionData } from "src/classes/Lancer/Action"
import type { IBonusData, ICounterData, IDeployableData, ISynergyData } from "src/classes/Lancer/common"
import type { ActivationType, Duration } from "src/classes/Lancer/enums"
import type { ITagData } from "src/classes/Lancer/interfaces"




export interface ICoreData {
  name: string
  description: string
  active_name: string
  active_effect: string
  activation: ActivationType
  deactivation?: ActivationType
  use?: Duration
  active_actions?: IActionData[]
  active_bonuses?: IBonusData[]
  active_synergies?: ISynergyData[]
  passive_name?: string
  passive_effect?: string
  passive_actions?: IActionData[]
  passive_bonuses?: IBonusData[]
  passive_synergies?: ISynergyData[]
  deployables?: IDeployableData[]
  counters?: ICounterData[]
  integrated?: string[]
  special_equipment?: string[]
  tags: ITagData[]
}