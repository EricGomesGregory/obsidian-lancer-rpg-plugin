import type { IActionData } from "./Action"
import type { ICounterData } from "./common/Counter"
import type { IDeployableData } from "./common/Deployable"
import type { ITagData } from "./interfaces"
import type { ISynergyData } from "./common/Synergy"
import type { IBonusData } from "./common"




export interface ICompendiumItemData {
  id: string
  name: string
  description: string
  actions?: IActionData[]
  bonuses?: IBonusData[]
  synergies?: ISynergyData[]
  deployables?: IDeployableData[]
  counters?: ICounterData[]
  special_equipment?: string[]
  integrated?: string[]
  brew?: string
  tags?: ITagData[]
}