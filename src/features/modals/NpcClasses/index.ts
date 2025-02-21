import { App, Modal } from "obsidian";
import * as Database from "src/database";
import NpcClass from "./components/NpcClass.svelte";
import { mount, unmount } from "svelte";



export class NpcClassesModal extends Modal {
  database: Database.Client;
  npcClasses: ReturnType<typeof NpcClass>[];

  constructor(app: App, database: Database.Client) {
    super(app);
    this.database = database;

    this.npcClasses = [];
  }

  onOpen(): void {
    this.setTitle("Npc Classes");
    this.database.getNpcClasses()
    .then((entries) => {
      if (entries === undefined) {
        // TODO:
        return;
      }
      entries.forEach((npcClassData) => {
        const npcClassElement = mount(NpcClass, { target: this.contentEl,props: { data: npcClassData }});
        this.npcClasses.push(npcClassElement);
      });
    })
    .catch((reason) => {
      // TODO: 
      console.error(reason);
    })
  }

  onClose(): void {
    this.npcClasses.forEach((npcClassElement) => unmount(npcClassElement));
  }
}