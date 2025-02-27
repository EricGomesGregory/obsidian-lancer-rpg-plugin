import type { Npc } from "src/classes/Lancer/Npc";
import {
  createNpc,
  createNpcClass,
  createNpcReaction,
  createNpcSystem,
  createNpcTech,
  createNpcTemplate,
  createNpcTrait,
  createNpcWeapon
} from "src/classes/Lancer/Npc";

import type { NpcReactionData, NpcSystemData, NpcTechData, NpcWeaponData } from "../models/npc/NpcFeature";
import { NpcFeatureType } from "../models/npc/NpcFeature";

import { RequestStatus, type RequestResult } from ".";
import type Client from "../Client";

enum EncounterSide {
  Enemy = 'Enemy',
  Ally = 'Ally',
  Neutral = 'Neutral',
}

export interface NpcRequest {
  tier: number
  side: EncounterSide
  npcClass: string // NpcClassId
  npcTemplates: string[]
  optionalFeatures?: string[]
}

export type NpcRequestResult = RequestResult<Npc>

export type NpcListRequestResult = RequestResult<Npc[]>


export async function requestNpcList(db: Client, requests: NpcRequest[]): Promise<NpcListRequestResult> {
  const result: NpcListRequestResult = {
    status: RequestStatus.Failed,
    data: []
  }
  
  for (const request of requests) {
    const npcResult = await requestNpc(db, request);
    if (npcResult.status == RequestStatus.Succeeded) {
      result.data.push(npcResult.data);
    }
  }
  
  result.status = RequestStatus.Succeeded;
  return result;
}

export async function requestNpc(db: Client, request: NpcRequest): Promise<NpcRequestResult> {
  const result: NpcRequestResult = {
    status: RequestStatus.Failed,
    data: createNpc()
  }
  let baseFeaturesIds: string[] = []
  let optionalFeaturesIds: string[] = []

  await db.getNpcClass(request.npcClass)
  .then((npcClassData) => {
    if (npcClassData === undefined) return result;

    const npcClass = createNpcClass(npcClassData, request.tier);
    result.data.class = npcClass;
    result.data.name = npcClass.name;
    result.data.tier = request.tier;
    baseFeaturesIds = [...npcClassData.base_features];
    optionalFeaturesIds = [...npcClassData.optional_features];
  })
  .catch((reason) => {
    console.error(reason);
    return result;
  })

  if (request.npcTemplates.length > 0) {
    await db.getNpcTemplates(request.npcTemplates)
    .then((npcTemplatesData) => {
      if (npcTemplatesData === undefined) return result;
      npcTemplatesData.forEach((npcTemplateData) => {
        const ncpTemplate = createNpcTemplate(npcTemplateData);
        result.data.templates.push(ncpTemplate);
        baseFeaturesIds = [...npcTemplateData.base_features];
        optionalFeaturesIds = [...npcTemplateData.optional_features];
      });
    })
    .catch((reason) => {
      console.error(reason);
      return result;
    })
  }

  let npcFeaturesIds = baseFeaturesIds;
  if (request.optionalFeatures) {
    const selectedOptionalFeatures = optionalFeaturesIds.filter((id) => request.optionalFeatures?.contains(id));
    npcFeaturesIds = [...selectedOptionalFeatures];
  }

  await db.getNpcFeatures(npcFeaturesIds)
  .then((npcFeaturesData) => {
    if (npcFeaturesData === undefined) return result;
    npcFeaturesData.forEach((npcFeatureData) => {
      if (npcFeatureData.type == NpcFeatureType.System) {
        const npcSystem = createNpcSystem(npcFeatureData as NpcSystemData, request.tier);
        result.data.features.push(npcSystem);
      }
      else if (npcFeatureData.type == NpcFeatureType.Reaction) {
        const npcReaction = createNpcReaction(npcFeatureData as NpcReactionData, request.tier);
        result.data.features.push(npcReaction);
      }
      else if (npcFeatureData.type == NpcFeatureType.Tech) {
        const npcTech = createNpcTech(npcFeatureData as NpcTechData, request.tier);
        result.data.features.push(npcTech);
      }
      else if (npcFeatureData.type == NpcFeatureType.Trait) {
        const npcReaction = createNpcTrait(npcFeatureData, request.tier);
        result.data.features.push(npcReaction);
      }
      else if (npcFeatureData.type == NpcFeatureType.Weapon) {
        const npcWeapon = createNpcWeapon(npcFeatureData as NpcWeaponData, request.tier);
        result.data.features.push(npcWeapon);
      }
    })
  })
  .catch((reason) => {
    console.error(reason);
    return result;
  })

  result.status = RequestStatus.Succeeded;
  return result;
}