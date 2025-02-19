import type { IActionData } from "./Action"
import type { IBackgroundData } from "./Backgrounds"
import type { Environment, Sitrep, Status } from "./interfaces"
import type { IManufacturerData } from "./Manufacturer"
import type { IFrameData, IMechSystemData, IMechWeaponData, IWeaponModData } from "./mech"
import type { INpcClassData, INpcFeatureData, INpcTemplateData } from "./npc"
import type { IBondData, ICoreBonusData, IPilotEquipmentData, IReserveData, ISkillData, ITalentData } from "./pilot"
import type { ITagCompendiumData } from "./Tags"




export type ContentPackDependency = {
  name: string
  version: string
  link: string
}

export interface IContentPackManifest {
  name: string
  item_prefix: string
  author: string
  version: string
  description?: string
  website?: string
  image_url?: string
  dependencies?: ContentPackDependency[]
}

export interface IContentPackData {
  manufacturers: IManufacturerData[]
  backgrounds: IBackgroundData[]
  coreBonuses: ICoreBonusData[]
  frames: IFrameData[]
  weapons: IMechWeaponData[]
  systems: IMechSystemData[]
  mods: IWeaponModData[]
  pilotGear: IPilotEquipmentData[]
  talents: ITalentData[]
  tags: ITagCompendiumData[]
  reserves: IReserveData[]
  skills: ISkillData[]

  npcClasses: INpcClassData[]
  npcFeatures: INpcFeatureData[]
  npcTemplates: INpcTemplateData[]

  bonds: IBondData[]

  actions: IActionData[]

  statuses: Status[]
  environments: Environment[]
  sitreps: Sitrep[]

  tables: any
}

export interface IContentPack {
  id: string
  active: boolean
  manifest: IContentPackManifest
  data: IContentPackData
  missing_content?: boolean
}