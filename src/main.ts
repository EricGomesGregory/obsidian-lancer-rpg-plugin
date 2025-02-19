import { Plugin } from 'obsidian';
import { Client } from './database';

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	mySetting: string;

}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default'
}

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;
	database: Client;

	async onload() {
		await this.loadSettings();

		this.database = new Client(this.app, 'lancer.db');
		await this.database.init();
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