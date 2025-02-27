import { Plugin, stringifyYaml, type MarkdownPostProcessorContext } from 'obsidian';
import { Client } from './database';

import { ContentPackManagerModal } from './features/modals/ContentPackManager';
import { NpcClassesModal } from './features/modals/NpcClasses';
import { EncounterBlock } from './features/markdown/code/Encounter';
import { ProgressClock } from './features/markdown/code/ProgressClock';


const LCP_MANAGER_COMMAND = 'lcp-manager-command';

const NPC_CLASS_LIST_COMMAND = 'npc-class-list-command';

const PROGRESS_CLOCK = 'lancer-progress-clock'
const ENCOUNTER_BLOCK = 'lancer-encounter';

interface LancerPluginSettings {
	LancerSetting: string;

}

const DEFAULT_SETTINGS: LancerPluginSettings = {
	LancerSetting: 'default'
}

export default class LancerPlugin extends Plugin {
	settings: LancerPluginSettings;
	database: Client;

	async onload() {
		await this.loadSettings();

		this.database = new Client(this.app, 'lancer.db');
		await this.database.init();

		this.addCommand({
			id: LCP_MANAGER_COMMAND,
			name: "Open LCP Manager",
			callback: () => {
				new ContentPackManagerModal(this.app, this.database).open();
			}
		});

		this.addCommand({
			id: NPC_CLASS_LIST_COMMAND,
			name: "Open Npc Class Viewer",
			callback: () => {
				new NpcClassesModal(this.app, this.database).open();
			}
		});

		//#region Markdown

		this.registerMarkdownCodeBlockProcessor(PROGRESS_CLOCK, async (source, element, context) => {
			await ProgressClock(this.database, source, element, context, (data) => {
				this.updateCodeBlock(data, element, context);
			});
		});

		this.registerMarkdownCodeBlockProcessor(ENCOUNTER_BLOCK, async (source, element, context) => {
			await EncounterBlock(this.database, source, element, context);
		});
	}

	updateCodeBlock(data: object, element: HTMLElement, context: MarkdownPostProcessorContext) {
		const sectionInfo = context.getSectionInfo(element);
				if (sectionInfo) {
					const content = "```" + PROGRESS_CLOCK + "\n" + stringifyYaml(data) + "```";
					this.app.workspace.activeEditor?.editor?.replaceRange(content, {line: sectionInfo.lineStart, ch: 0}, {line: sectionInfo.lineEnd, ch:3});
				}
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}