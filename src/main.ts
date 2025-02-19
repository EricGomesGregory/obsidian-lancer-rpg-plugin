import { Plugin } from 'obsidian';
import { PrismaClient } from '@prisma/client';
import { join } from 'path';

import * as fs from 'fs';

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default'
}

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;
	prisma: PrismaClient;
	
	async onload() {
		await this.loadSettings();

		await this.initDatabase();
	}

	async initDatabase() {
		if (this.manifest.dir == undefined) {
			console.error("[DATABASE] init: Manifest directory not found");
			return;
		}

		const basePath = (this.app.vault.adapter as any).getBasePath();
		const pluginPath = join(basePath, this.manifest.dir);
		const dbPath = join(pluginPath, 'lancer.db');
		
		console.log("[DATABASE] init: Trying to open dbPath...")
		if (fs.existsSync(dbPath) == false) {
			console.log("[DATABASE] init: Creating db from dbPath=" + `${this.manifest.dir}\\lancer.db`)
			fs.writeFileSync(dbPath, "");
		} else {
			console.log("[DATABASE] init: Open db in dbPath=" + `${this.manifest.dir}\\lancer.db`)
		}

		this.prisma = new PrismaClient({
      datasources: {
        db: { url: `file:${dbPath}` },
      },
			log: ['info']
    });

		console.log("creating base table")
		await this.prisma.contentPackManifest.createMany({data: [
			{
				id: 0,
				name: "test",
				description: "test",
				author: "test",
				version: "",
				website: "",
				image_url: ""
			}
		]});

		let manifests = await this.prisma.contentPackManifest.findMany();
		console.log(manifests)
	}

	onunload() {
		this.prisma.$disconnect();
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
