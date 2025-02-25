import type { EnvironmentData } from "./Environment"
import type { NpcClassData, NpcFeatureData, NpcTemplateData } from "./npc"
import type { SitrepData } from "./Sitrep"




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

  environments: EnvironmentData[]
  sitreps: SitrepData[]
}

export interface ContentPack {
  id: string,
  active: boolean,
  manifest: ContentPackManifest,
  data: ContentPackData,
  missing_content?: boolean
}

function createManifest(): ContentPackManifest {
  return {
    name: "",
    item_prefix: "",
    author: "",
    version: ""
  }
}

function createData(): ContentPackData {
  return {
    npcClasses: [],
    npcFeatures: [],
    npcTemplates: [],
    environments: [],
    sitreps: []
  }
}

export function createContentPack(): ContentPack {
  return {
    id: '',
    active: false,
    manifest: createManifest(),
    data: createData(),
  }
}