import { normalizePath, type App } from "obsidian";

import * as Models from "./models";
import * as Importer from "./Importer";


const SAVE_INTERVAL = 30_000;

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

  private encoder: TextEncoder;
  private decoder: TextDecoder;

  constructor(app: App, dbPath: string) {
    this.app = app;
    this.dbPath = normalizePath(dbPath);
    this.contentPacks = new Map();
    console.log(this.dbPath);

    this.encoder = new TextEncoder();
    this.decoder = new TextDecoder();
  }

  async init(): Promise<Client> {
    const adapter = this.app.vault.adapter;
    if (await adapter.exists(this.dbPath)) {
      await this.load();
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

  async getContentPacks(): Promise<Models.ContentPack[]> {
    if (Date.now() - this.lastSaved > SAVE_INTERVAL) {
      await this.load();
    }
    return Array.from( this.contentPacks.values());
  }
}

export default Client;