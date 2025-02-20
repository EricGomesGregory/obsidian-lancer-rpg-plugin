import { Plugin } from 'obsidian';
import { Client } from './database';
import { ContentPackManagerModal } from './features/modals/ContentPackManager';


const LCP_MANAGER_COMMAND = 'lcp-manager-command';

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
		})
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