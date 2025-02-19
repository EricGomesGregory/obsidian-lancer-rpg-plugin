// global declaration file for common interfaces that are used too often to warrant placing in @/interfaces
export interface IImageContainer {
  SetLocalImage(): any
  SetCloudImage(): any
  Image: string
}

export interface INotificationVariant {
  color: string
  icon: string
  prefix?: string
  timeout?: number
}

export interface INotification {
  id: string
  variant: string
  text: string
  onClick?: () => void
}

export interface IErrorReport {
  time: Date
  message: string
  component?: string
  stack: string
}

export interface IRankedData {
  id: string
  rank: number
  custom?: boolean
  custom_desc?: string
  custom_detail?: string
}

export interface IEquipmentData {
  id: string
  destroyed: boolean
  cascading: boolean
  note: string
  uses?: number
  flavorName?: string
  flavorDescription?: string
  customDamageType?: string
}

export interface IMechWeaponSaveData extends IEquipmentData {
  loaded: boolean
  mod?: IEquipmentData
  customDamageType?: string
  maxUseOverride?: number
  selectedProfile: number
}

export interface ICounterSaveData {
  id: string
  val: number
}

export interface IOrganizationData {
  name: string
  purpose: string
  description: string
  efficiency: number
  influence: number
  actions: string
}

export interface IPilotLoadoutData {
  id: string
  name: string
  armor: (IEquipmentData | null)[]
  weapons: (IEquipmentData | null)[]
  gear: (IEquipmentData | null)[]
  extendedWeapons: (IEquipmentData | null)[]
  extendedGear: (IEquipmentData | null)[]
}

export interface IHistoryItem {
  field: string
  val?: any
}

export interface IMountData {
  mount_type: string
  lock: boolean
  modifiable: boolean
  slots: IWeaponSlotData[]
  extra: IWeaponSlotData[]
  bonus_effects: string[]
}

export interface IWeaponSlotData {
  size: string
  weapon: IMechWeaponSaveData | null
}

export interface ITagData {
  id: string
  val?: string | number
}

export interface ILicenseRequirement {
  source: string
  name: string
  license_id: string
  rank: number
  items: string[]
  missing?: boolean
}

export interface ISnackbarSettings {
  text: string
  multiline?: boolean
  timeout?: number
  color?: string
  visible?: boolean
}

export interface Brew {
  info: string
  dir: string
}

export interface PrintOptions {
  mech_id: string
  loadout_index: number
  combo: boolean
}

export interface Status {
  name: string
  type: string
  icon: string
  effects: string[]
}

export interface Environment {
  id: string
  name: string
  description: string
}

export interface Sitrep {
  id: string
  name: string
  description: string
  pcVictory: string
  enemyVictory: string
  noVictory?: string
  deployment?: string
  objective?: string
  controlZone?: string
  extraction?: string
}