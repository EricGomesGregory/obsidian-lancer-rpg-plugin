import type { ImageTag, MechType, MountType } from "../../enums"
import type { ILicensedItemData } from "../../pilot"
import type { ICoreData } from "./CoreSystem"
import type { IFrameTraitData } from "./FrameTrait"



interface IFrameStats {
  size: number
  structure: number
  stress: number
  armor: number
  hp: number
  evasion: number
  edef: number
  heatcap: number
  repcap: number
  sensor_range: number
  tech_attack: number
  save: number
  speed: number
  sp: number
}

export interface IFrameData extends ILicensedItemData {
  mechtype: MechType[]
  license_level: number
  mounts: MountType[]
  stats: IFrameStats
  traits: IFrameTraitData[]
  core_system: ICoreData
  specialty: boolean | { source: string; min_rank: number; cumulative?: boolean }
  variant?: string
  y_pos?: number
  image_url?: string
  other_art?: { tag?: ImageTag; src?: string; url?: string }[]
}