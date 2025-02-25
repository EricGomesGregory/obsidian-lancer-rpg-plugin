import * as Model from "src/database/models";



export function createSitrep(data?: Model.SitrepData): Sitrep {
  return {
    name: data ? data.name : "",
    description: data ? data.description : "",
    pcVictory: data ? data.pcVictory : "",
    enemyVictory: data ? data.enemyVictory : "",
    noVictory: data ? data.noVictory : undefined,
    deployment: data ? data.deployment : undefined,
    objective: data ? data.objective : undefined,
    controlZone: data ? data.controlZone : undefined,
    extraction: data ? data.extraction : undefined
  }
}

export interface Sitrep {
  name: string
  description: string
  pcVictory: string
  enemyVictory: string
  noVictory?: string
  deployment?: string
  objective?: string
  controlZone?: string
  extraction?: string
}