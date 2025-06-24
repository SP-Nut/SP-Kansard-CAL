// Material related types
export interface Material {
  id: number
  name: string
  prices: {
    M: number
    'M+': number
    L: number
    'L+': number
    Stainless_S: number | null
    Stainless_M: number
  }
}

// Ceiling and Louver types
export interface CeilingLouver {
  id: number
  name: string
  price: number
}

// Enum types
export type MaterialType = 'translucent' | 'opaque'
export type StructureSize = 'M' | 'M+' | 'L' | 'L+' | 'Stainless_S' | 'Stainless_M'

// Calculation result types
export interface CalculationResult {
  materialCost: number
  ceilingCost?: number
  louverCost?: number
  totalCost: number
  area: number
  steps: string
}
