'use client'

import React, { useState, useEffect } from 'react'
import { MaterialType, StructureSize, CalculationResult } from '@/types'
import { translucentMaterials, opaqueMaterials } from '@/data/materials'
import { ceilings } from '@/data/ceilings'
import { louvers } from '@/data/louvers'
import { gutters } from '@/data/gutters'
import { calculateTotalPrice, formatPrice } from '@/utils/calculations'
import { MaterialSelector } from '@/components/MaterialCalculator/MaterialSelector'
import { DimensionInput } from '@/components/MaterialCalculator/DimensionInput'
import { AdditionalOptions } from '@/components/MaterialCalculator/AdditionalOptions'
import { Button } from '@/components/ui/Button'
import { PriceDisplay } from '@/components/MaterialCalculator/PriceDisplay'
import { ResultDisplay } from '@/components/MaterialCalculator/ResultDisplay'

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

  const [selectedCeilingId, setSelectedCeilingId] = useState<number | null>(null)
  const [selectedLouverId, setSelectedLouverId] = useState<number | null>(null)
  const [selectedGutterId, setSelectedGutterId] = useState<number | null>(null)

  const [result, setResult] = useState<CalculationResult | null>(null)

  const currentMaterials = materialType === 'translucent' ? translucentMaterials : opaqueMaterials
  const selectedMaterial = currentMaterials.find(m => m.id === selectedMaterialId) || null
  const selectedCeiling = selectedCeilingId ? ceilings.find(c => c.id === selectedCeilingId) : undefined
  const selectedLouver = selectedLouverId ? louvers.find(l => l.id === selectedLouverId) : undefined
  const selectedGutter = useGutter && selectedGutterId ? gutters.find(g => g.id === selectedGutterId) : undefined

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
      })
      setResult(calculationResult)
    } catch {
      // Silent error handling
    }
  }

  const canCalculate = selectedMaterial && width && length && parseFloat(width) > 0 && parseFloat(length) > 0

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg space-y-8">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            สร้างใบเสนอราคา
          </h1>

          {/* 1. เลือกวัสดุ */}
          <section>
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
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
          <section>
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
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
          <section>
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
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
            />
          </section>

          {/* ปุ่มคำนวณ */}
          <Button
            variant="primary"
            size="lg"
            onClick={handleCalculate}
            disabled={!canCalculate}
            className="w-full"
          >
            คำนวณราคา
          </Button>
        </div>

        {/* 4. แสดงผล */}
        <div className="lg:sticky lg:top-8 h-fit">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg space-y-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white border-b dark:border-gray-600 pb-3">
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
                <div className="border-t dark:border-gray-600 pt-4 mt-4 text-right">
                  <span className="text-base text-gray-600 dark:text-gray-300">ราคารวมทั้งหมด</span>
                  <div className="font-bold text-2xl text-green-600 dark:text-green-400">
                    {formatPrice(result.totalCost)} ฿
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-10 px-4">
                <p className="text-gray-500 dark:text-gray-400">
                  กรอกข้อมูลด้านซ้ายและกด 'คำนวณราคา' เพื่อดูสรุปใบเสนอราคา
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
