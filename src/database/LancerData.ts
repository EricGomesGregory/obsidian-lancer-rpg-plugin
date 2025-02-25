import LancerDataPackage from "@massif/lancer-data/package.json"
import LancerDataEnvironment from "@massif/lancer-data/lib/environments.json";
import SitrepLancerData from "@massif/lancer-data/lib/sitreps.json";

import * as Model from "./models";
import { createContentPack } from "./models/ContentPack";

type LancerDataType = 'environment' | 'sitrep';


export function getBaseContentPack(): Model.ContentPack {
  const baseContentPack = createContentPack();
  
  baseContentPack.active = true;
  baseContentPack.manifest = createBaseManifest();
  baseContentPack.id = baseContentPack.manifest.name.toLowerCase().replace(' ', '-');
  baseContentPack.data.environments = loadLancerData('environment');
  baseContentPack.data.sitreps = loadLancerData('sitrep');

  return baseContentPack;
}

function createBaseManifest(): Model.ContentPackManifest {
  return {
    name: "Lancer Data",
    item_prefix: "base",
    version: LancerDataPackage.version,
    author: LancerDataPackage.author
  }
}

function loadLancerData<T>(dataType: LancerDataType): T[] {
  if (dataType == 'environment') {
    return LancerDataEnvironment as T[]
  }
  else if (dataType == 'sitrep') {
    return SitrepLancerData as T[]
  }

  return []
}