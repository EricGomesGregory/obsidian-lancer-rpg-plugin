import { parseYaml, type MarkdownPostProcessorContext } from "obsidian";
import * as Lancer from "src/classes/Lancer";
import * as Database from "src/database";
import { RequestStatus } from "src/database/requests";

type Context = MarkdownPostProcessorContext;

export interface EncounterRequest {
  environment: string //environment id
  sitrep: string // sitrep id
  forces: Database.Requests.NpcRequest[]
  reinforcements?: Database.Requests.NpcRequest[] 
}

export interface Encounter {
  environment: Lancer.Environment,
  sitrep: Lancer.Sitrep,
  forces: Lancer.Npc[];
  reinforcements?: Lancer.Npc[]
}

function createEncounter(): Encounter {
  return {
    environment: Lancer.createEnvironment(),
    sitrep: Lancer.createSitrep(),
    forces: []
  }
}

export async function EncounterBlock(database: Database.Client, source: string, element: HTMLElement, context: Context) {
  const request = parseYaml(source) as EncounterRequest;
  console.log(request)
  const encounter = await requestEncounter(database, request);
  console.log(encounter)
}

async function requestEncounter(database: Database.Client, request: EncounterRequest): Promise<Encounter|undefined> {
  const encounter = createEncounter();
  const environment = await database.getEnvironment(request.environment);
  if (environment == undefined) {
    return encounter;
  }
  encounter.environment = Lancer.createEnvironment(environment);
  
  const sitrep = await database.getSitrep(request.sitrep);
  if (sitrep == undefined) {
    return encounter;
  }
  encounter.sitrep =Lancer.createSitrep(sitrep);
  
  const forcesRequest = await Database.Requests.requestNpcList(database, request.forces);
  if (forcesRequest.status == RequestStatus.Succeeded) {
    encounter.forces = forcesRequest.data;
  }

  if (request.reinforcements) {
    const reinforcementsRequest = await Database.Requests.requestNpcList(database, request.reinforcements);
    if (reinforcementsRequest.status == RequestStatus.Succeeded) {
      encounter.forces = reinforcementsRequest.data;
    } 
  }
  return encounter;
}