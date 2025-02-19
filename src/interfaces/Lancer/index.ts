import * as Mech from "./mech"
import * as Npc from "./npc"
import * as Pilot from "./pilot"
import * as Enums from "./enums";

import type { IActionData } from "./Action";
import type { IBackgroundData } from "./Backgrounds";
import type { IBonusData, IDeployableData, ISynergyData } from "./common";
import type { IContentPack, IContentPackData, IContentPackManifest } from "./ContentPack";
import type { IDamageData } from "./Damage";
import type { Brew, Environment, ICounterSaveData, IEquipmentData, IErrorReport, IHistoryItem, IImageContainer, ILicenseRequirement, IMechWeaponSaveData, IMountData, INotification, INotificationVariant, IOrganizationData, IPilotLoadoutData, IRankedData, ISnackbarSettings, ITagData, IWeaponSlotData, PrintOptions, Sitrep, Status } from "./interfaces";
import type { IManufacturerData } from "./Manufacturer";
import type { IRangeData } from "./Range";
import type { ITagCompendiumData } from "./Tags";




export type {
  IActionData,
  IBackgroundData,
  Brew,
  IBonusData,
  IContentPackManifest,
  IContentPack,
  IContentPackData,
  ICounterSaveData,
  IDamageData,
  IDeployableData,
  IEquipmentData,
  IErrorReport,
  Environment,
  IHistoryItem,
  IImageContainer,
  ILicenseRequirement,
  IManufacturerData,
  IMechWeaponSaveData,
  IMountData,
  INotification,
  INotificationVariant,
  IOrganizationData,
  IPilotLoadoutData,
  PrintOptions,
  IRankedData,
  IRangeData,
  Sitrep,
  Status,
  ISnackbarSettings,
  ISynergyData,
  ITagData,
  ITagCompendiumData,
  IWeaponSlotData,
  Enums,
  Mech,
  Npc,
  Pilot
}

function createContentPackData(): IContentPackData {
  return {
    actions: [],
    manufacturers: [],
    backgrounds: [],
    coreBonuses: [],
    frames: [],
    weapons: [],
    systems: [],
    mods: [],
    pilotGear: [],
    talents: [],
    tags: [],
    reserves: [],
    skills: [],

    npcClasses: [],
    npcFeatures: [],
    npcTemplates: [],

    bonds: [],

    statuses: [],
    environments: [],
    sitreps: [],
    
    tables: undefined
  }
}

function createManifest(): IContentPackManifest {
  return {
    name: "",
    item_prefix: "",
    author: "",
    version: "0.0.0",
  }
}

export function createContentPack(): IContentPack {
  return {
    id: "",
    active: false,
    manifest: createManifest(),
    data: createContentPackData()
  }
}

export function getContentPackId(manifest: IContentPackManifest) {
  const prefix = manifest.item_prefix;
  const title = manifest.name.toLowerCase().replace(' ', '-');
  return `${prefix}-${title}`;
}