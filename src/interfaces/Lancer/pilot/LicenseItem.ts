import type { ICompendiumItemData } from "../CompendiumItem"



export interface ILicenseRequirement {
  source: string
  name: string
  license_id: string
  rank: number
  items: string[]
  missing?: boolean
}

export interface ILicensedItemData extends ICompendiumItemData {
  source: string
  license: string
  license_level: number
  license_id?: string
}