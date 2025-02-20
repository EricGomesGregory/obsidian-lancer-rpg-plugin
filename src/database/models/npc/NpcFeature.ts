import type { RangeData, TagData } from "../common"




export enum NpcFeatureType {
  Trait = 'Trait',
  System = 'System',
  Reaction = 'Reaction',
  Weapon = 'Weapon',
  Tech = 'Tech',
}

export interface OriginData {
  type: string
  name: string
  base: boolean
}

export interface NpcFeatureData {
  id: string
  name: string
  origin: OriginData
  locked: boolean
  effect?: string
  bonus?: object
  override?: object
  tags: TagData[]
  brew: string
  hide_active: boolean
  type: NpcFeatureType
}

export interface NpcReactionData extends NpcFeatureData {
  trigger: string
  type: NpcFeatureType.Reaction
}


export interface NpcSystemData extends NpcFeatureData {
  type: NpcFeatureType.System
}


export interface NpcTechData extends NpcFeatureData {
  tags: TagData[]
  tech_type: string
  accuracy?: number[]
  attack_bonus?: number[]
  type: NpcFeatureType.Tech
}


export interface NpcDamageData {
  type: string
  damage: number[]
}

export interface NpcWeaponData extends NpcFeatureData {
  weapon_type: string
  damage: NpcDamageData[]
  range: RangeData[]
  on_hit: string
  accuracy: number[]
  attack_bonus: number[]
  tags: TagData[]
  type: NpcFeatureType.Weapon
}