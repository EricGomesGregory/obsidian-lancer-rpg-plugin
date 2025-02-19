


type prompt = {
  question: string
  options: string[]
}

type BondPower = {
  name: string
  description: string
  frequency: string
  veteran: boolean
  master: boolean
}

export interface IBondData {
  id: string
  name: string
  major_ideals: string[]
  minor_ideals: string[]
  questions: prompt[]
  powers: BondPower[]
}