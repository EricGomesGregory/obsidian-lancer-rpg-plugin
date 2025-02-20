



export enum RangeType {
  Range = 'Range',
  Threat = 'Threat',
  Thrown = 'Thrown',
  Line = 'Line',
  Cone = 'Cone',
  Blast = 'Blast',
  Burst = 'Burst',
}

export interface RangeData {
  type: RangeType
  val: number
  override?: boolean
  bonus?: number
}