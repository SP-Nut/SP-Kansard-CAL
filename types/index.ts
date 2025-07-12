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
  discount?: number // ส่วนลด (บาท)
  vat?: number // ภาษีมูลค่าเพิ่ม (%)
}

// Ceiling and Louver types
export interface CeilingLouver {
  id: number
  name: string
  price: number
}

// Electricity type
export interface ElectricityOption {
  id: string
  name: string
  price: number
}

// Gutter type
export interface GutterItem {
  id: number
  label: string
  material: 'stainless' | 'aluminum' | 'vinyl' | 'pvc'
  price: number
}

// Railing Extra type
export interface RailingExtraOption {
  id: string
  name: string
  price: number
}

// Ventilator type
export interface VentilatorOption {
  id: string
  name: string
  price: number
}

// Post type
export interface PostOption {
  id: string
  name: string
  price: number
}

// Foundation type
export interface FoundationOption {
  id: string
  name: string
  price: number
}

// Color type
export interface ColorOption {
  id: string
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
  gutterCost?: number
  electricityCost?: number
  railingExtraCost?: number
  ventilatorCost?: number
  postCost?: number
  foundationCost?: number
  colorCost?: number
  totalCost: number
  discount: number
  vatRate: number
  vatAmount: number
  grandTotal: number
  area: number
  steps: string
}
