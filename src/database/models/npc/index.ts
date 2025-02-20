import type { NpcTemplateData } from "./NpcTemplate";
import type { NpcClassStats, NpcClassData } from "./NpcClass";
import type { NpcFeatureData, NpcReactionData, NpcSystemData, NpcTechData, NpcWeaponData } from "./NpcFeature";


export type {
  NpcClassData,
  NpcFeatureData,
  NpcSystemData,
  NpcReactionData,
  NpcWeaponData,
  NpcTechData,
  NpcTemplateData,
}


export interface NpcData {
  id: string // unique id
  name: string
  role: string
  info: { flavor: string; tactics: string }
  stats: NpcClassStats
  base_features: NpcFeatureData[]
  optional_features: NpcFeatureData[]
  brew: string

  templates?: NpcTemplateData[]
}