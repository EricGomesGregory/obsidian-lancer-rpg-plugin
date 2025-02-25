import type { NpcTemplateData } from "./NpcTemplate";
import type { NpcClassStats, NpcClassData } from "./NpcClass";
import type { NpcDamageData, NpcFeatureData, NpcFeatureType, NpcReactionData, NpcSystemData, NpcTechData, NpcWeaponData, OriginData } from "./NpcFeature";


export type {
  NpcClassData,
  NpcClassStats,
  NpcFeatureData,
  NpcFeatureType,
  NpcSystemData,
  NpcReactionData,
  NpcWeaponData,
  NpcTechData,
  NpcTemplateData,
  OriginData,
  NpcDamageData,
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