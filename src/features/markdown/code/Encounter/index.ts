import { parseYaml, type MarkdownPostProcessorContext } from "obsidian";
import * as Lancer from "src/classes/Lancer";
import * as Database from "src/database";
import { RequestStatus } from "src/database/requests";
import { mount } from "svelte";
import EncounterUI from "./components/Encounter.svelte";

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
  if (encounter === undefined) {
    // TODO: Add fallback 
    return;
  }

  mount(EncounterUI, {
    target: element,
    props: {
      encounter: encounter
    }
  });
}

async function requestEncounter(database: Database.Client, request: EncounterRequest): Promise<Encounter|undefined> {
  console.log("requestEncounter: 0")
  const encounter = createEncounter();
  console.log("requestEncounter: 1")
  const environment = await database.getEnvironment(request.environment);
  if (environment == undefined) {
    return encounter;
  }
  console.log("requestEncounter: 2")
  encounter.environment = Lancer.createEnvironment(environment);
  console.log("requestEncounter: 3")
  const sitrep = await database.getSitrep(request.sitrep);
  if (sitrep == undefined) {
    return encounter;
  }
  console.log("requestEncounter: 4")
  encounter.sitrep =Lancer.createSitrep(sitrep);
  console.log("requestEncounter: 5")
  const npcListResult = await Database.Requests.requestNpcList(database, request.forces);
  console.log("requestEncounter: 6")
  if (npcListResult.status == RequestStatus.Succeeded) {
    console.log("requestEncounter: 6.1")
    encounter.forces = npcListResult.data;
  }
  console.log("requestEncounter: 7")
  if (request.reinforcements) {
    const reinforcementsRequest = await Database.Requests.requestNpcList(database, request.reinforcements);
    if (reinforcementsRequest.status == RequestStatus.Succeeded) {
      encounter.forces = reinforcementsRequest.data;
    } 
  }
  return encounter;
}