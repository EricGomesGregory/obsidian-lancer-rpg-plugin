import type { IActionData } from "../Action"
import type { IBonusData } from "./Bonus"
import type { ICompendiumItemData } from "../CompendiumItem"
import type { ICounterData } from "./Counter"
import type { ActivationType } from "../enums"
import type { ITagData } from "../interfaces"
import type { ISynergyData } from "./Synergy"



export interface IDeployableData extends ICompendiumItemData {
  name: string
  detail: string
  type: string // this is for UI furnishing only
  activation: ActivationType
  resistances?: string[]
  instances?: number
  deactivation?: ActivationType
  recall?: ActivationType
  redeploy?: ActivationType
  size: number
  cost?: number
  armor?: number
  hp?: number
  evasion?: number
  edef?: number
  heatcap?: number
  repcap?: number
  sensor_range?: number
  tech_attack?: number
  save?: number
  speed?: number
  actions?: IActionData[]
  bonuses?: IBonusData[]
  synergies?: ISynergyData[]
  counters?: ICounterData[]
  tags?: ITagData[]
  pilot?: boolean
  mech?: boolean
}

export interface IDeployedData {
  // id: string
  data: IDeployableData
  assigned_name: string
  current_hp: number
  current_duration?: number
  overshield?: number
  Destroyed?: boolean
}