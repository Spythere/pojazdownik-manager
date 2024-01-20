export interface IStockInfoResponse {
  version: string
  // generator: Generator;
  info: Info
  props: Prop[]
}

export interface Info {
  'loco-e': [string, string, string, string, number | null][]
  'loco-s': string | null[][]
  'loco-szt': string | null[][]
  'loco-ezt': string | null[][]
  'car-passenger': [string, string, boolean, number | null, string][]
  'car-cargo': [string, string, boolean, number | null, string][]
}

export interface Prop {
  type: string
  length: number
  mass: number
  cargo?: string
  coldStart?: boolean
  doubleManned?: boolean
}
