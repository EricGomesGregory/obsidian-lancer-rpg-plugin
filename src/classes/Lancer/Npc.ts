import * as Model from 'src/database/models';


export function createNpc(): Npc {
  return {
    id: "", // TODO: uuid()
    name: "",
    tier: 0,
    class: {
      name: "",
      role: "",
      info: {
        flavor: "",
        tactics: ""
      },
      stats: {
        activations: 0,
        armor: 0,
        hp: 0,
        evade: 0,
        edef: 0,
        heatcap: 0,
        speed: 0,
        sensor: 0,
        save: 0,
        hull: 0,
        agility: 0,
        systems: 0,
        engineering: 0,
        size: [],
        structure: 0,
        stress: 0
      },
      brew: ""
    },
    templates: [],
    features: []
  }
}

export interface Npc {
  id: string // unique id
  name: string
  tier: number
  class: NpcClass
  templates: NpcTemplate[]
  features: NpcFeature[]
}

//#region Class

export function createNpcClass(classData: Model.NpcClassData, tier: number): NpcClass {
  return {
    name: classData.name,
    role: classData.role,
    info: classData.info,
    stats: createNpcClassStats(classData, tier),
    brew: classData.brew
  }
}

interface NpcClass {
  name: string
  role: string
  info: { flavor: string; tactics: string }  
  stats: NpcClassStats
  brew: string
}

export function createNpcClassStats(classData: Model.NpcClassData, tier: number): NpcClassStats {
  const statsData = classData.stats;
  return {
    activations: statsData.activations[tier],
  armor: statsData.armor[tier],
  hp:  statsData.hp[tier],
  evade:  statsData.evade[tier],
  edef: statsData.edef[tier],
  heatcap: statsData.heatcap[tier],
  speed: statsData.speed[tier],
  sensor: statsData.sensor[tier],
  save: statsData.save[tier],
  hull: statsData.hull[tier],
  agility: statsData.agility[tier],
  systems: statsData.systems[tier],
  engineering: statsData.engineering[tier],
  size: statsData.size[tier],
  structure: statsData.structure? statsData.structure[tier] : 1,
  stress: statsData.stress?statsData.stress[tier] : 1
  }
}

interface NpcClassStats {
  activations: number
  armor: number
  hp: number
  evade: number
  edef: number
  heatcap: number
  speed: number
  sensor: number
  save: number
  hull: number
  agility: number
  systems: number
  engineering: number
  size: number[]
  structure: number
  stress: number
}

//#region Templates

export function createNpcTemplate(templateData: Model.NpcTemplateData): NpcTemplate {
  return {
    name: templateData.name,
    description: templateData.description,
    brew: templateData.brew
  }
}

interface NpcTemplate {
  name: string
  description: string
  brew: string
}

interface NpcFeature {
  name: string
  tier: number
  origin: Model.OriginData
  locked: boolean
  effect?: string
  bonus?: object
  override?: object 
  tags: string // TODO: replace with Tag
  brew: string
  hide_active: boolean
  type: Model.NpcFeatureType
}

export function createNpcTrait(featureData: Model.NpcFeatureData, tier: number): NpcFeature {
  return {
    name: featureData.name,
    tier: tier,
    origin: featureData.origin,
    locked: featureData.locked,
    effect: featureData.effect,
    bonus: featureData.bonus,
    override: featureData.override,
    tags: "", // TODO: createTags(featureData.tags),
    brew: featureData.brew,
    hide_active: featureData.hide_active,
    type: featureData.type,
  }
}

//#region Reaction

export function createNpcReaction(featureData: Model.NpcReactionData, tier: number): NpcReaction {
  return {
    name: featureData.name,
    tier: tier,
    origin: featureData.origin,
    locked: featureData.locked,
    effect: featureData.effect,
    bonus: featureData.bonus,
    override: featureData.override,
    tags: "", // TODO: createTags(featureData.tags),
    brew: featureData.brew,
    hide_active: featureData.hide_active,
    type: featureData.type,
    // Reaction
    trigger: featureData.trigger
  }
}

export interface NpcReaction extends NpcFeature {
  type: Model.NpcFeatureType.Reaction
  trigger: string
}

//#region System

export function createNpcSystem(featureData: Model.NpcSystemData, tier: number): NpcSystem {
  return {
    name: featureData.name,
    tier: tier,
    origin: featureData.origin,
    locked: featureData.locked,
    effect: featureData.effect,
    bonus: featureData.bonus,
    override: featureData.override,
    tags: "", // TODO: createTags(featureData.tags),
    brew: featureData.brew,
    hide_active: featureData.hide_active,
    type: featureData.type
  }
}

export interface NpcSystem extends NpcFeature { 
  type: Model.NpcFeatureType.System
}

//#region Tech

export function createNpcTech(featureData: Model.NpcTechData, tier: number): NpcTech {
  const accuracy = featureData.accuracy? featureData.accuracy : undefined;
  const attack_bonus = featureData.attack_bonus ? featureData.attack_bonus : undefined;
  return {
    name: featureData.name,
    tier: tier,
    origin: featureData.origin,
    locked: featureData.locked,
    effect: featureData.effect,
    bonus: featureData.bonus,
    override: featureData.override,
    tags: "", // TODO: createTags(featureData.tags),
    brew: featureData.brew,
    hide_active: featureData.hide_active,
    type: featureData.type,
    // Tech
    tech_type: featureData.tech_type,
    accuracy: accuracy,
    attack_bonus: attack_bonus
  }
}

export interface NpcTech extends NpcFeature {
  type: Model.NpcFeatureType.Tech
  tags: string // TODO: Tag[]
  tech_type: string
  accuracy?: number[]
  attack_bonus?: number[]
}

//#region Weapon

export function createNpcWeapon(featureData: Model.NpcWeaponData, tier: number): NpcWeapon {
  return {
    name: featureData.name,
    tier: tier,
    origin: featureData.origin,
    locked: featureData.locked,
    effect: featureData.effect,
    bonus: featureData.bonus,
    override: featureData.override,
    tags: "", // TODO: createTags(featureData.tags),
    brew: featureData.brew,
    hide_active: featureData.hide_active,
    type: featureData.type,
    // Weapon
    damage: featureData.damage,
    range: "", //featureData.range, // TODO: Range
    accuracy: featureData.accuracy,
    attack_bonus: featureData.attack_bonus
  }
}

export interface NpcWeapon extends NpcFeature {
  type: Model.NpcFeatureType.Weapon
  damage: NpcDamage[]
  range: string // TODO: Range
  accuracy: number[]
  attack_bonus: number[]
  tags: string // TODO: Tags
}

interface NpcDamage {
  type: string
  damage: number[]
}
