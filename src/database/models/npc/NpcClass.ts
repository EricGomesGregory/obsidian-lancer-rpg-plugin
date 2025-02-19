


export interface NpcClassData {
  id: string,
  name: string
  role: string
  info: { flavor: string; tactics: string }
  stats: NpcClassStats
  base_features: string[]
  optional_features: string[]
  brew: string
}

export interface NpcClassStats {
  activations: number[]
  armor: number[]
  hp: number[]
  evade: number[]
  edef: number[]
  heatcap: number[]
  speed: number[]
  sensor: number[]
  save: number[]
  hull: number[]
  agility: number[]
  systems: number[]
  engineering: number[]
  size: number[][]
  structure?: number[]
  stress?: number[]
}