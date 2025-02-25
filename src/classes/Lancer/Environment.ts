import * as Model from "src/database/models";



export function createEnvironment(data?: Model.EnvironmentData): Environment {
  return {
    name: data ? data.name : "",
    description: data ? data.description : ""
  }
}

export interface Environment {
  name: string
  description: string
}

