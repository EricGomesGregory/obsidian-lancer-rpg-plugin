import { normalizePath, type App } from "obsidian";

import * as Models from "./models";

class Client {
  app: App;
  dbPath: string; //normalized path
  contentPacks: Models.ContentPack[];

  constructor(app: App, dbPath: string) {
    this.app = app;
    this.dbPath = normalizePath(dbPath);
    console.log(this.dbPath);
  }

  async init(): Promise<Client> {
    const adapter = this.app.vault.adapter;
    if (await adapter.exists(this.dbPath)) {
      const dbArrayBuffer = await adapter.readBinary(this.dbPath);
      console.log(dbArrayBuffer);
    } else {
      const data: ArrayBuffer = new ArrayBuffer();
      await adapter.writeBinary(this.dbPath, data);
    }
    return this;
  }

  async import(lcpFile: File): Promise<Client> {

    return this;
  }
}

export default Client;