import type { ITagData } from "../interfaces"
import type { IRangeData } from "../Range"

export enum NpcFeatureType {
  Trait = 'Trait',
  System = 'System',
  Reaction = 'Reaction',
  Weapon = 'Weapon',
  Tech = 'Tech',
}

export interface IOriginData {
  type: string
  name: string
  base: boolean
}

export interface INpcFeatureData {
  id: string
  name: string
  origin: IOriginData
  locked: boolean
  effect?: string
  bonus?: object
  override?: object
  tags: ITagData[]
  brew: string
  hide_active: boolean
  type: NpcFeatureType
}


export interface INpcReactionData extends INpcFeatureData {
  trigger: string
  type: NpcFeatureType.Reaction
}


export interface INpcSystemData extends INpcFeatureData {
  type: NpcFeatureType.System
}


export interface INpcTechData extends INpcFeatureData {
  tags: ITagData[]
  tech_type: string
  accuracy?: number[]
  attack_bonus?: number[]
  type: NpcFeatureType.Tech
}


export interface INpcDamageData {
  type: string
  damage: number[]
}

export interface INpcWeaponData extends INpcFeatureData {
  weapon_type: string
  damage: INpcDamageData[]
  range: IRangeData[]
  on_hit: string
  accuracy: number[]
  attack_bonus: number[]
  tags: ITagData[]
  type: NpcFeatureType.Weapon
}