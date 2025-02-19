import type { INpcClassStats } from "./NpcClassStats";



export interface INpcClassData {
  id: string
  name: string
  role: string
  info: { flavor: string; tactics: string }
  stats: INpcClassStats
  base_features: string[]
  optional_features: string[]
  brew: string
}

