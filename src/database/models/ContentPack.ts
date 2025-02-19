import type { NpcClassData, NpcFeatureData, NpcTemplateData } from "./npc"




export type ContentPackDependency = {
  name: string
  version: string
  link: string
}

export type ContentPackManifest = {
  name: string,
  item_prefix: string
  author: string
  version: string
  description?: string
  website?: string
  image_url?: string
  dependencies?: ContentPackDependency[]
}

export interface ContentPackData {
  // TODO: Implement data from IContentPackData

  npcClasses: NpcClassData[]
  npcFeatures: NpcFeatureData[]
  npcTemplates: NpcTemplateData[]
}

export interface ContentPack {
  id: string,
  active: boolean,
  manifest: ContentPackManifest,
  data: ContentPackData,
  missing_content?: boolean
}