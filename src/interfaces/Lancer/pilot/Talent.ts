import type { ICompendiumItemData } from "../CompendiumItem"




export interface ITalentRankData extends ICompendiumItemData {
  exclusive: boolean
}

export interface ITalentData extends ICompendiumItemData {
  terse: string
  ranks: ITalentRankData[]
}