import { App, Modal } from "obsidian";
import * as Database from 'src/database';

import ContentPackManager from "./components/ContentPackManager.svelte";
import { mount, unmount } from "svelte";


export class ContentPackManagerModal extends Modal {
  private database: Database.Client;
  private contentPackManager: ReturnType<typeof ContentPackManager> | undefined;

  constructor(app: App, database: Database.Client) {
    super(app)
    this.database = database;
  }

  onOpen(): void {
    this.contentPackManager = mount(ContentPackManager, {
      target: this.contentEl,
      props: {
        onImport: (file) => this.database.import(file)
        .then((db) => {
          db.getContentPacks()
          .then((contentPacks) => {
            this.contentPackManager?.update(contentPacks);
          })
          .catch((error) => console.error(error))
        })
        .catch((error) => console.error(error)),

        onRemove: (lcpId) => this.database.remove(lcpId, () => {
          console.log("Removed lcp")
        })
        .then((db) => {
          db.getContentPacks()
          .then((contentPacks) => this.contentPackManager?.update(contentPacks))
          .catch((error) => console.error(error));
        })
        .catch((error) => console.error(error)),
      }
    });
    
    this.database.getContentPacks()
    .then((contentPacks) => {
      this.contentPackManager?.update(contentPacks);
    })
    .catch((error) => console.error(error));
  }

  onClose(): void {
    if (this.contentPackManager) {
      unmount(this.contentPackManager);
    }
  }
}