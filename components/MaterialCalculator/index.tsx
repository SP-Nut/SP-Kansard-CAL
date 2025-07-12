'use client'

import React, { useState, useEffect } from 'react'
import { MaterialType, StructureSize, CalculationResult } from '@/types'
import { translucentMaterials, opaqueMaterials } from '@/data/materials'
import { ceilings } from '@/data/ceilings'
import { louvers } from '@/data/louvers'
import { gutters } from '@/data/gutters'
import electricityOptions from '@/data/electricity'
import railingExtras from '@/data/railingExtras'
import ventilatorOptions from '@/data/ventilators'
import { calculateTotalPrice, formatPrice } from '@/utils/calculations'
import { MaterialSelector } from '@/components/MaterialCalculator/MaterialSelector'
import { DimensionInput } from '@/components/MaterialCalculator/DimensionInput'
import { AdditionalOptions } from '@/components/MaterialCalculator/AdditionalOptions'
import { Button } from '@/components/ui/Button'
import { PriceDisplay } from '@/components/MaterialCalculator/PriceDisplay'
import { ResultDisplay } from '@/components/MaterialCalculator/ResultDisplay'
import posts from '@/data/posts'
import foundations from '@/data/foundations'
import colorOptions from '@/data/colors'

const STRUCTURE_SIZES: StructureSize[] = ['M', 'M+', 'L', 'L+', 'Stainless_S', 'Stainless_M']

export const MaterialCalculator: React.FC = () => {
  const [materialType, setMaterialType] = useState<MaterialType>('translucent')
  const [selectedMaterialId, setSelectedMaterialId] = useState<number | null>(null)
  const [selectedSize, setSelectedSize] = useState<StructureSize>('M')
  const [width, setWidth] = useState<string>('')
  const [length, setLength] = useState<string>('')

  const [useCeiling, setUseCeiling] = useState<boolean>(false)
  const [useLouver, setUseLouver] = useState<boolean>(false)
  const [useGutter, setUseGutter] = useState<boolean>(false)
  const [useElectricity, setUseElectricity] = useState<boolean>(false)
  const [useRailingExtra, setUseRailingExtra] = useState<boolean>(false)
  const [useVentilator, setUseVentilator] = useState<boolean>(false)
  const [usePost, setUsePost] = useState<boolean>(false)
  const [useFoundation, setUseFoundation] = useState<boolean>(false)
  const [useColor, setUseColor] = useState<boolean>(false)

  const [selectedCeilingId, setSelectedCeilingId] = useState<number | null>(null)
  const [selectedLouverId, setSelectedLouverId] = useState<number | null>(null)
  const [selectedGutterId, setSelectedGutterId] = useState<number | null>(null)
  const [selectedElectricityId, setSelectedElectricityId] = useState<string | null>(null)
  const [selectedRailingExtraId, setSelectedRailingExtraId] = useState<string | null>(null)
  const [selectedVentilatorId, setSelectedVentilatorId] = useState<string | null>(null)
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null)
  const [selectedFoundationId, setSelectedFoundationId] = useState<string | null>(null)
  const [selectedColorId, setSelectedColorId] = useState<string | null>(null)

  const [result, setResult] = useState<CalculationResult | null>(null)

  const currentMaterials = materialType === 'translucent' ? translucentMaterials : opaqueMaterials
  const selectedMaterial = currentMaterials.find(m => m.id === selectedMaterialId) || null
  const selectedCeiling = selectedCeilingId ? ceilings.find(c => c.id === selectedCeilingId) : undefined
  const selectedLouver = selectedLouverId ? louvers.find(l => l.id === selectedLouverId) : undefined
  const selectedGutter = useGutter && selectedGutterId ? gutters.find(g => g.id === selectedGutterId) : undefined
  const selectedElectricity = useElectricity && selectedElectricityId ? electricityOptions.find(e => e.id === selectedElectricityId) : undefined
  const selectedRailingExtra = useRailingExtra && selectedRailingExtraId ? railingExtras.find(e => e.id === selectedRailingExtraId) : undefined
  const selectedVentilator = useVentilator && selectedVentilatorId ? ventilatorOptions.find(e => e.id === selectedVentilatorId) : undefined

  // Flatten post/foundation for selection
  const allPostOptions = posts.flatMap(group => group.options)
  const allFoundationOptions = foundations.flatMap(group => group.options)
  const selectedPost = usePost && selectedPostId ? allPostOptions.find(e => e.id === selectedPostId) : undefined
  const selectedFoundation = useFoundation && selectedFoundationId ? allFoundationOptions.find(e => e.id === selectedFoundationId) : undefined
  const selectedColor = useColor && selectedColorId ? colorOptions.find(e => e.id === selectedColorId) : undefined

  useEffect(() => {
    setSelectedMaterialId(null)
    setResult(null)
  }, [materialType])

  useEffect(() => {
    if (!useCeiling) setSelectedCeilingId(null)
  }, [useCeiling])

  useEffect(() => {
    if (!useLouver) setSelectedLouverId(null)
  }, [useLouver])

  useEffect(() => {
    if (!useGutter) setSelectedGutterId(null)
  }, [useGutter])

  useEffect(() => {
    if (!useElectricity) setSelectedElectricityId(null)
  }, [useElectricity])

  useEffect(() => {
    if (!useRailingExtra) setSelectedRailingExtraId(null)
  }, [useRailingExtra])

  useEffect(() => {
    if (!useVentilator) setSelectedVentilatorId(null)
  }, [useVentilator])

  useEffect(() => {
    if (!usePost) setSelectedPostId(null)
  }, [usePost])

  useEffect(() => {
    if (!useFoundation) setSelectedFoundationId(null)
  }, [useFoundation])

  useEffect(() => {
    if (!useColor) setSelectedColorId(null)
  }, [useColor])

  const handleCalculate = () => {
    const w = parseFloat(width)
    const l = parseFloat(length)

    if (!selectedMaterial || isNaN(w) || isNaN(l) || w <= 0 || l <= 0) return

    try {
      const calculationResult = calculateTotalPrice({
        material: selectedMaterial,
        structureSize: selectedSize,
        width: w,
        length: l,
        ceiling: selectedCeiling,
        louver: selectedLouver,
        gutter: selectedGutter,
        electricity: selectedElectricity,
        railingExtra: selectedRailingExtra,
        ventilator: selectedVentilator,
        post: selectedPost,
        foundation: selectedFoundation,
        color: selectedColor,
      })
      setResult(calculationResult)
    } catch {
      // Silent error handling
    }
  }

  const canCalculate = selectedMaterial && width && length && parseFloat(width) > 0 && parseFloat(length) > 0

  return (
    <div className="min-h-screen bg-[#f4f6f8] flex flex-col p-0 sm:p-4">
      <div className="flex-1 w-full flex flex-row gap-4" style={{width: '100%'}}>
        <div className="bg-white border border-gray-300 rounded-md p-4 sm:p-6 flex flex-col justify-between min-h-[calc(100vh-48px)] shadow-sm" style={{width: '70%'}}>
          <div>
            <h1 className="text-2xl font-bold text-blue-900 mb-5 tracking-tight">
              สร้างใบเสนอราคา
            </h1>

            {/* 1. เลือกวัสดุ */}
            <section className="mb-4">
              <h2 className="text-base font-semibold text-gray-800 mb-2 border-l-4 border-blue-700 pl-2">
                1. เลือกวัสดุและโครงสร้าง
              </h2>
              <MaterialSelector
                materialType={materialType}
                onMaterialTypeChange={setMaterialType}
                selectedMaterialId={selectedMaterialId}
                onMaterialChange={setSelectedMaterialId}
                selectedSize={selectedSize}
                onSizeChange={setSelectedSize}
              />
            </section>

            {/* 2. ขนาด */}
            <section className="mb-4">
              <h2 className="text-base font-semibold text-gray-800 mb-2 border-l-4 border-blue-700 pl-2">
                2. ระบุขนาด (เมตร)
              </h2>
              <DimensionInput
                width={width}
                length={length}
                onWidthChange={setWidth}
                onLengthChange={setLength}
              />
            </section>

            {/* 3. ตัวเลือกเพิ่มเติม */}
            <section className="mb-4">
              <h2 className="text-base font-semibold text-gray-800 mb-2 border-l-4 border-blue-700 pl-2">
                3. ตัวเลือกเพิ่มเติม
              </h2>
              <AdditionalOptions
                useCeiling={useCeiling}
                useLouver={useLouver}
                useGutter={useGutter}
                selectedCeilingId={selectedCeilingId}
                selectedLouverId={selectedLouverId}
                selectedGutterId={selectedGutterId}
                onUseCeilingChange={setUseCeiling}
                onUseLouverChange={setUseLouver}
                onUseGutterChange={setUseGutter}
                onCeilingChange={setSelectedCeilingId}
                onLouverChange={setSelectedLouverId}
                onGutterChange={setSelectedGutterId}
                useElectricity={useElectricity}
                selectedElectricityId={selectedElectricityId}
                onUseElectricityChange={setUseElectricity}
                onElectricityChange={setSelectedElectricityId}
                useRailingExtra={useRailingExtra}
                selectedRailingExtraId={selectedRailingExtraId}
                onUseRailingExtraChange={setUseRailingExtra}
                onRailingExtraChange={setSelectedRailingExtraId}
                useVentilator={useVentilator}
                selectedVentilatorId={selectedVentilatorId}
                onUseVentilatorChange={setUseVentilator}
                onVentilatorChange={setSelectedVentilatorId}
                usePost={usePost}
                selectedPostId={selectedPostId}
                onUsePostChange={setUsePost}
                onPostChange={setSelectedPostId}
                useFoundation={useFoundation}
                selectedFoundationId={selectedFoundationId}
                onUseFoundationChange={setUseFoundation}
                onFoundationChange={setSelectedFoundationId}
                useColor={useColor}
                selectedColorId={selectedColorId}
                onUseColorChange={setUseColor}
                onColorChange={setSelectedColorId}
              />
            </section>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={handleCalculate}
            disabled={!canCalculate}
            className="w-full mt-4 text-base font-semibold tracking-wide rounded-md bg-blue-700 hover:bg-blue-800 border-blue-700"
          >
            คำนวณราคา
          </Button>
        </div>

        <div className="bg-white border border-gray-300 rounded-md p-4 sm:p-6 flex flex-col min-h-[calc(100vh-48px)] shadow-sm" style={{width: '30%'}}>
          <h2 className="text-xl font-bold text-blue-900 border-b border-gray-200 pb-3 mb-4">
            สรุปรายการ
          </h2>

          {selectedMaterial && (
            <PriceDisplay
              material={selectedMaterial}
              selectedSize={selectedSize}
            />
          )}

          {result ? (
            <>
              <ResultDisplay result={result} />
              <div className="border-t border-gray-200 pt-4 mt-4 text-right">
                <span className="text-base text-gray-700">ราคารวมทั้งหมด</span>
                <div className="font-bold text-2xl text-blue-800">
                  {formatPrice(result.totalCost)} ฿
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-10 px-4">
              <p className="text-gray-500">
                กรอกข้อมูลด้านซ้ายและกด 'คำนวณราคา' เพื่อดูสรุปใบเสนอราคา
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
