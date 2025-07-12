import { CalculationResult, Material, CeilingLouver, StructureSize, ElectricityOption, RailingExtraOption, VentilatorOption, PostOption, FoundationOption, ColorOption } from '@/types'
import { GutterItem } from '@/data/gutters'

interface CalculationParams {
  material: Material
  structureSize: StructureSize
  width: number
  length: number
  ceiling?: CeilingLouver
  louver?: CeilingLouver
  gutter?: GutterItem
  electricity?: ElectricityOption
  railingExtra?: RailingExtraOption
  ventilator?: VentilatorOption
  post?: PostOption
  foundation?: FoundationOption
  color?: ColorOption
}

export function calculateTotalPrice(params: CalculationParams): CalculationResult {
  const { material, structureSize, width, length, ceiling, louver, gutter, electricity, railingExtra, ventilator, post, foundation, color } = params

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
  let electricityCost: number | undefined
  let railingExtraCost: number | undefined
  let ventilatorCost: number | undefined
  let postCost: number | undefined
  let foundationCost: number | undefined
  let colorCost: number | undefined

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

  // Calculate electricity cost
  if (electricity) {
    electricityCost = electricity.price
    totalCost += electricityCost
    steps += `\n+ งานไฟฟ้า: ${electricity.name} = ${electricity.price.toLocaleString()} บาท`
  }

  // Calculate railing extra cost
  if (railingExtra) {
    railingExtraCost = railingExtra.price
    totalCost += railingExtraCost
    steps += `\n+ งานราวกันตก: ${railingExtra.name} = ${railingExtra.price.toLocaleString()} บาท`
  }

  // Calculate ventilator cost
  if (ventilator) {
    ventilatorCost = ventilator.price
    totalCost += ventilatorCost
    steps += `\n+ งานระบายอากาศ: ${ventilator.name} = ${ventilator.price.toLocaleString()} บาท`
  }

  // Calculate post cost
  if (post) {
    postCost = post.price
    totalCost += postCost
    steps += `\n+ เสา: ${post.name} = ${post.price.toLocaleString()} บาท`
  }

  // Calculate foundation cost
  if (foundation) {
    foundationCost = foundation.price
    totalCost += foundationCost
    steps += `\n+ ฐานราก: ${foundation.name} = ${foundation.price.toLocaleString()} บาท`
  }

  // Calculate color cost
  if (color) {
    colorCost = color.price
    totalCost += colorCost
    steps += `\n+ สี: ${color.name} = ${color.price.toLocaleString()} บาท`
  }

  steps += `\n\nรวมทั้งหมด: ${totalCost.toLocaleString()} บาท`

  return {
    materialCost,
    ceilingCost,
    louverCost,
    gutterCost,
    electricityCost,
    railingExtraCost,
    ventilatorCost,
    postCost,
    foundationCost,
    colorCost,
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
