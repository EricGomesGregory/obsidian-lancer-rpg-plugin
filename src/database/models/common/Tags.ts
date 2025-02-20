



export interface TagCompendiumData {
  id: string
  name: string
  description: string
  filter_ignore?: boolean
  hidden?: boolean
  brew?: string
}

export interface TagData {
  id: string,
  val?: string | number
}