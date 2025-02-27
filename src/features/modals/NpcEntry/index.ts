import { App, Modal } from "obsidian";
import type { Npc } from "src/classes/Lancer";

import NpcUI from "./components/Npc.svelte";
import { mount, unmount } from "svelte";




export class NpcEntryModal extends Modal {
  npc: Npc;
  npcUI: ReturnType<typeof NpcUI> | undefined;

  constructor(app: App, npc: Npc) {
    super(app)
    this.npc = npc;
  }

  onOpen(): void {
    this.npcUI = mount(NpcUI, {
      target: this.contentEl,
      props: {
        data: this.npc
      }
    })    
  }

  onClose(): void {
    if (this.npcUI) {
      unmount(this.npcUI);
    }
  }
}