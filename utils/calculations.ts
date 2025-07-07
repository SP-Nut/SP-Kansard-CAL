import { CalculationResult, Material, CeilingLouver, StructureSize } from '@/types'
import { GutterItem } from '@/data/gutters'

interface CalculationParams {
  material: Material
  structureSize: StructureSize
  width: number
  length: number
  ceiling?: CeilingLouver
  louver?: CeilingLouver
  gutter?: GutterItem
}

export function calculateTotalPrice(params: CalculationParams): CalculationResult {
  const { material, structureSize, width, length, ceiling, louver, gutter } = params

  const area = width * length
  const materialPrice = material.prices[structureSize]

  if (materialPrice === null) {
    throw new Error(`ไม่มีราคาสำหรับขนาด ${structureSize}`)
  }

  const materialCost = area * materialPrice
  let totalCost = materialCost
  let steps = `วัสดุหลังคา: ${width} × ${length} × ${materialPrice.toLocaleString()} = ${materialCost.toLocaleString()} บาท`

  let ceilingCost: number | undefined
  let louverCost: number | undefined
  let gutterCost: number | undefined

  // Calculate ceiling cost
  if (ceiling) {
    ceilingCost = area * ceiling.price
    totalCost += ceilingCost
    steps += `\n+ ฝ้า: ${area.toFixed(2)} × ${ceiling.price.toLocaleString()} = ${ceilingCost.toLocaleString()} บาท`
  }

  // Calculate louver cost
  if (louver) {
    louverCost = area * louver.price
    totalCost += louverCost
    steps += `\n+ ระแนง: ${area.toFixed(2)} × ${louver.price.toLocaleString()} = ${louverCost.toLocaleString()} บาท`
  }

  // Calculate gutter cost
  if (gutter) {
    gutterCost = length * gutter.price
    totalCost += gutterCost
    steps += `\n+ รางน้ำ: ${length.toFixed(2)} × ${gutter.price.toLocaleString()} = ${gutterCost.toLocaleString()} บาท`
  }

  steps += `\n\nรวมทั้งหมด: ${totalCost.toLocaleString()} บาท`

  return {
    materialCost,
    ceilingCost,
    louverCost,
    gutterCost,
    totalCost,
    area,
    steps
  }
}

export function formatPrice(price: number): string {
  return price.toLocaleString('th-TH')
}

export function formatArea(area: number): string {
  return area.toFixed(2)
}
