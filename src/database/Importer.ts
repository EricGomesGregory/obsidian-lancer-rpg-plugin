import * as Models from "./models";
import JSZip from "jszip";

import { createContentPack } from "./models/ContentPack";

const MANIFEST = 'lcp_manifest.json';

const NPC_CLASSES = 'npc_classes.json';
const NPC_FEATURES = 'npc_features.json';
const NPC_TEMPLATES = 'npc_templates.json';

const ENVIRONMENTS = 'environments.json';
const SITREPS = 'sitreps.json'



function getLcpId(manifest: Models.ContentPackManifest): string {
  return manifest.name.toLowerCase().replace(' ', '-');
}

async function extractZipContents(file: File): Promise<Map<string, string>> {
  const zip = await JSZip.loadAsync(file);
  const fileContents = new Map<string, string>();

  for (const [fileName, zipEntry] of Object.entries(zip.files)) {
      if (!zipEntry.dir) {
          const content = await zipEntry.async("text");
          fileContents.set(fileName, content);
      }
  }

  return fileContents;
}

export async function extractLcp(lcpFile: File): Promise<Models.ContentPack> {
  const contentPack = createContentPack();
  const jsonEntries = await extractZipContents(lcpFile);
  jsonEntries.forEach((value, key) => {
    if (key == MANIFEST) {
      const manifest = JSON.parse(value);
      contentPack.manifest = manifest;
      contentPack.id = getLcpId(manifest);
      contentPack.active = true;
    }
    if (key == NPC_CLASSES) {
      const npcClasses: Models.NpcClassData[] = JSON.parse(value);
      contentPack.data.npcClasses = npcClasses;

      console.log(`[ContentPack] Found ${npcClasses.length} NpcClasses`);
    }
    if (key == NPC_FEATURES) {
      const npcFeatures: Models.NpcFeatureData[] = JSON.parse(value);
      contentPack.data.npcFeatures = npcFeatures;

      console.log(`[ContentPack] Found ${npcFeatures.length} NpcFeatures`);
    }
    if (key == NPC_TEMPLATES) {
      const npcTemplates: Models.NpcTemplateData[] = JSON.parse(value);
      contentPack.data.npcTemplates = npcTemplates;

      console.log(`[ContentPack] Found ${npcTemplates.length} NpcTemplates`);
    }
    if (key == ENVIRONMENTS) {
      const environments: Models.EnvironmentData[] = JSON.parse(value);
      contentPack.data.environments = environments;

      console.log(`[ContentPack] Found ${environments.length} Environments`);
    }
    if (key == SITREPS) {
      const sitreps: Models.SitrepData[] = JSON.parse(value);
      contentPack.data.sitreps = sitreps;

      console.log(`[ContentPack] Found ${sitreps.length} Sitreps`);
    }
  });
  return contentPack;
}



 