import { normalizePath, type App } from "obsidian";

import * as Models from "./models";
import * as Importer from "./Importer";

type ModelType = "Manifest" | "NpcClass" | "NpcFeature" | "NpcTemplate";
//const SAVE_INTERVAL = 30_000;

interface ClientSave {
  contentPacks: Models.ContentPack[],
  lastSaved: number
}

function createSaveState(contentPacks: Models.ContentPack[]): ClientSave {
  return {
    contentPacks: contentPacks,
    lastSaved: Date.now()
  }
}

class Client {
  private app: App;
  private dbPath: string; //normalized path
  private contentPacks: Map<string, Models.ContentPack>;
  private lastSaved: number;

  private manifests: Map<string, Models.ContentPackManifest>;

  private npcClasses: Map<string, Models.NpcClassData>;
  private npcFeatures: Map<string, Models.NpcFeatureData>;
  private npcTemplates: Map<string, Models.NpcTemplateData>;

  private encoder: TextEncoder;
  private decoder: TextDecoder;

  constructor(app: App, dbPath: string) {
    this.app = app;
    this.dbPath = normalizePath(dbPath);
    this.contentPacks = new Map();
    console.log(this.dbPath);

    this.manifests = new Map();
    
    this.npcClasses = new Map();
    this.npcFeatures = new Map();
    this.npcTemplates = new Map();

    this.encoder = new TextEncoder();
    this.decoder = new TextDecoder();
  }

  async init(): Promise<Client> {
    const adapter = this.app.vault.adapter;
    if (await adapter.exists(this.dbPath)) {
      await this.load();
      await this.update();
    } else {
      await this.save();
    }
    return this;
  }

  async import(lcpFile: File): Promise<Client> {
    try {
      const lcp = await Importer.extractLcp(lcpFile);
      console.log(lcp);
      this.contentPacks.set(lcp.id, lcp);
      await this.save();
      await this.update();
    } 
    catch (error) { 
      console.error(error);
    }
    return this;
  }

  async remove(id: string, onRemoved?: () => void): Promise<Client> {
    if (this.contentPacks.delete(id)) {
      await this.save();
      onRemoved?.();
    } else {
      console.error(`[DATABASE] removeLcp: Failed to remove lcp with id=${id}`);
    }
    return this;
  }

  async getContentPacks(): Promise<Models.ContentPack[]> {
    return Array.from( this.contentPacks.values());
  }

  //#region Npc

  async getNpcClass(id: string): Promise<Models.NpcClassData | undefined> {
    return this.get(id, "NpcClass");
  }

  async getNpcClasses(ids?: string[]): Promise<Models.NpcClassData[] | undefined> {
    if (ids === undefined) return this.getAll("NpcClass");
    return this.getMany(ids, "NpcClass");
  }

  async getNpcFeature(id: string): Promise<Models.NpcFeatureData | undefined> {
    return this.get(id, "NpcFeature");
  }

  async getNpcFeatures(ids?: string[]): Promise<Models.NpcFeatureData[] | undefined> {
    if (ids === undefined) return this.getAll("NpcFeature");
    return this.getMany(ids, "NpcFeature");
  }

  async getNpcTemplate(id: string): Promise<Models.NpcTemplateData[] | undefined> {
    return this.get(id, "NpcTemplate");
  }

  async getNpcTemplates(ids?: string[]): Promise<Models.NpcTemplateData[] | undefined> {
    if (ids === undefined) return this.getAll("NpcTemplate");
    return this.getMany(ids, "NpcTemplate");
  }

  //#region private

  private async update(): Promise<Client> {
    let updateManifest = true;
    this.contentPacks.forEach((contentPack, contentPackId) => {
      if (updateManifest) {
        this.manifests.set(contentPackId, contentPack.manifest);
        updateManifest = false;
      }
      
      contentPack.data.npcClasses
      .forEach((npcClass) => this.npcClasses.set(npcClass.id, npcClass));

      contentPack.data.npcFeatures
      .forEach((npcFeature) => this.npcFeatures.set(npcFeature.id, npcFeature));

    })
    return this;
  }

  private async save(): Promise<Client> {
    const content = await this.getContentPacks();
    const saveState = JSON.stringify(createSaveState(content));
    // TODO: Handle encryption
    const data = this.encoder.encode(saveState).buffer as ArrayBuffer;
    await this.app.vault.adapter.writeBinary(this.dbPath, data);
    return this;
  }

  private async load(): Promise<Client> {
    const buffer = await this.app.vault.adapter.readBinary(this.dbPath);
    const data = this.decoder.decode(buffer);
    // TODO: Handle decryption
    const saveState = JSON.parse(data) as ClientSave;

    saveState.contentPacks.forEach((contentPack) => {
      this.contentPacks.set(contentPack.id, contentPack);
    });
    this.lastSaved = saveState.lastSaved;
    return this;
  }

  private async get<T>(id: string, model: ModelType): Promise<T | undefined> {
    await this.update();
    if (model == "Manifest") return this.manifests.get(id) as T;
    if (model == "NpcClass") return this.npcClasses.get(id) as T;
    if (model == "NpcFeature") return this.npcFeatures.get(id) as T;
    if (model == "NpcTemplate") return this.npcTemplates.get(id) as T;
  }

  private async getMany<T>(ids: string[], model: ModelType): Promise<T[] | undefined> {
    await this.update();
    const result: T[] = [];
    ids.forEach((id) => {
      if (model == "Manifest") {
        const manifestResult = this.manifests.get(id) as T;
        if (manifestResult != undefined) {
          result.push(manifestResult);
        }
      }
      else if (model == "NpcClass") {
        const npcClassResult = this.npcClasses.get(id) as T;
        if (npcClassResult != undefined) {
          result.push(npcClassResult);
        }
      }
      else if (model == "NpcFeature") {
        const npcFeatureResult = this.npcFeatures.get(id) as T;
        if (npcFeatureResult != undefined) {
          result.push(npcFeatureResult);
        }
      }
      else if (model == "NpcTemplate") {
        const npcTemplateResult = this.npcTemplates.get(id) as T;
        if (npcTemplateResult != undefined) {
          result.push(npcTemplateResult);
        }
      }
    })
    return result;
  }

  private async getAll<T>(model: ModelType): Promise<T[] | undefined> {
    if (model == "Manifest") return Array.from(this.manifests.values()) as T[]
    if (model == "NpcClass") return Array.from(this.npcClasses.values()) as T[]
    if (model == "NpcFeature") return Array.from(this.npcFeatures.values()) as T[]
    if (model == "NpcTemplate") return Array.from(this.npcTemplates.values()) as T[]
  }
}

export default Client;