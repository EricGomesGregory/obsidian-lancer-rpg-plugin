import type { ActivationType } from "./enums"
import type { IRangeData } from "./Range"




export interface IActionData {
  id?: string
  name: string
  activation: ActivationType
  cost?: number
  frequency?: string
  init?: string
  trigger?: string
  terse?: string
  detail: string
  description?: string
  pilot?: boolean
  mech?: boolean
  damage?: ImageData[]
  range?: IRangeData[]
  hide_active?: boolean
  synergy_locations?: string[]
  confirm?: string[]
  log?: string
  ignore_used?: boolean
  heat_cost?: number
  tech_attack?: boolean
}

export enum ActivePeriod {
  Turn = 'Turn',
  Round = 'Round',
  Scene = 'Scene',
  Encounter = 'Encounter',
  Mission = 'Mission',
  Unlimited = 'Unlimited',
}