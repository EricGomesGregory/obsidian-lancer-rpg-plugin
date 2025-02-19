import { normalizePath, type App } from "obsidian";


class Client {
  app: App;
  dbPath: string; //normalized path

  constructor(app: App, dbPath: string) {
    this.app = app;
    this.dbPath = normalizePath(dbPath);
    console.log(this.dbPath);
  }

  async init() {
    const adapter = this.app.vault.adapter;
    if (await adapter.exists(this.dbPath)) {
      const dbArrayBuffer = await adapter.readBinary(this.dbPath);
      console.log(dbArrayBuffer);
    } else {
      const data: ArrayBuffer = new ArrayBuffer();
      await adapter.writeBinary(this.dbPath, data);
    }
  }
}

export default Client;