import { normalizePath, type App } from "obsidian";

import * as Models from "./models";
import * as Importer from "./Importer";

class Client {
  private app: App;
  private dbPath: string; //normalized path
  private contentPacks: Map<string, Models.ContentPack>;

  constructor(app: App, dbPath: string) {
    this.app = app;
    this.dbPath = normalizePath(dbPath);
    this.contentPacks = new Map();
    console.log(this.dbPath);
  }

  async init(): Promise<Client> {
    const adapter = this.app.vault.adapter;
    if (await adapter.exists(this.dbPath)) {
      const dbArrayBuffer = await adapter.readBinary(this.dbPath);
      console.log(dbArrayBuffer);
    } else {
      const data: ArrayBuffer = new ArrayBuffer(32);
      await adapter.writeBinary(this.dbPath, data);
    }
    return this;
  }

  async importLcp(lcpFile: File): Promise<Client> {
    try {
      const lcp = await Importer.extractLcp(lcpFile);
      console.log(lcp);
      this.contentPacks.set(lcp.id, lcp);
    } 
    catch (error) { 
      console.error(error);
    }
    return this;
  }

  async removeLcp(id: string, onRemoved?: () => void): Promise<Client> {
    if (this.contentPacks.delete(id)) {
      onRemoved?.();
    } else {
      console.error(`[DATABASE] removeLcp: Failed to remove lcp with id=${id}`);
    }
    return this;
  }

  async getContentPacks(): Promise<Models.ContentPack[]> {
    return Array.from( this.contentPacks.values());
  }
}

export default Client;