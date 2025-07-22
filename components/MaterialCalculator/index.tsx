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
    <div className="space-y-4">
      {/* Compact Progress Indicator */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium transition-all duration-200 ${
                selectedMaterial && width && length ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
              }`}>
                1
              </div>
              <div className="text-xs">
                <div className="font-medium text-gray-900">ข้อมูลโครงการ</div>
                <div className="text-gray-500 text-[10px]">
                  {selectedMaterial && width && length ? 'ครบถ้วน' : 'กรอกข้อมูล'}
                </div>
              </div>
            </div>
            
            <div className={`w-8 h-0.5 ${canCalculate ? 'bg-green-300' : 'bg-gray-200'}`}></div>
            
            <div className="flex items-center space-x-2">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium transition-all duration-200 ${
                result ? 'bg-green-500 text-white' : 
                canCalculate ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-500'
              }`}>
                2
              </div>
              <div className="text-xs">
                <div className="font-medium text-gray-900">คำนวณราคา</div>
                <div className="text-gray-500 text-[10px]">
                  {result ? 'เสร็จสิ้น' : canCalculate ? 'พร้อมคำนวณ' : 'รอข้อมูล'}
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-xs font-medium text-gray-900">
              {!selectedMaterial ? 'เริ่มต้นเลือกวัสดุ' : 
               !width || !length ? 'กรอกขนาดให้ครบ' : 
               !result ? 'กดปุ่มคำนวณราคา' : 'เสร็จสิ้นการคำนวณ'}
            </div>
            <div className="text-[10px] text-gray-500 mt-0.5">
              ขั้นตอนที่ {!selectedMaterial || !width || !length ? '1' : '2'} จาก 2
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Left Column - Main Card */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 space-y-6">
            {/* Dimensions Input - ขึ้นมาบนสุด */}
            <div>
              <h3 className="text-sm font-medium text-gray-800 mb-3 flex items-center">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                ระบุขนาด (เมตร)
              </h3>
              <DimensionInput
                width={width}
                length={length}
                onWidthChange={setWidth}
                onLengthChange={setLength}
              />
            </div>
            
            {/* Divider */}
            <div className="border-t border-gray-100"></div>
            
            {/* Material Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-800 mb-3 flex items-center">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                เลือกวัสดุและโครงสร้าง
              </h3>
              <MaterialSelector
                materialType={materialType}
                onMaterialTypeChange={setMaterialType}
                selectedMaterialId={selectedMaterialId}
                onMaterialChange={setSelectedMaterialId}
                selectedSize={selectedSize}
                onSizeChange={setSelectedSize}
              />
            </div>

            {/* Additional Options after Material Selection - แบ่งซ้ายขวา */}
            {selectedMaterial && (
              <>
                {/* Divider */}
                <div className="border-t border-gray-100"></div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-800 mb-4 flex items-center">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></span>
                    ตัวเลือกหลังเลือกวัสดุ
                    <span className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-full ml-2">
                      แนะนำ
                    </span>
                  </h3>
                  
                  {/* Grid Layout สำหรับแบ่งซ้ายขวา */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* คอลัมน์ที่ 1 - เลือกสี */}
                    <div className="bg-indigo-50 rounded-lg border border-indigo-200 p-4 space-y-3">
                      <div className="flex items-center space-x-3">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={useColor}
                            onChange={(e) => setUseColor(e.target.checked)}
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          />
                          <span className="ml-2 text-sm font-medium text-gray-700">เลือกสีพิเศษ</span>
                        </label>
                      </div>
                      
                      {useColor && (
                        <div>
                          <select
                            value={selectedColorId || ''}
                            onChange={(e) => setSelectedColorId(e.target.value || null)}
                            className="w-full p-2 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          >
                            <option value="">-- เลือกสี --</option>
                            {colorOptions.map((color) => (
                              <option key={color.id} value={color.id}>
                                {color.name} - {color.price ? `+${color.price} บาท` : 'ไม่มีค่าใช้จ่ายเพิ่ม'}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>

                    {/* คอลัมน์ที่ 2 - เพิ่มเสา */}
                    <div className="bg-green-50 rounded-lg border border-green-200 p-4 space-y-3">
                      <div className="flex items-center space-x-3">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={usePost}
                            onChange={(e) => setUsePost(e.target.checked)}
                            className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                          />
                          <span className="ml-2 text-sm font-medium text-gray-700">เพิ่มเสา</span>
                        </label>
                      </div>
                      
                      {usePost && (
                        <div>
                          <select
                            value={selectedPostId || ''}
                            onChange={(e) => setSelectedPostId(e.target.value || null)}
                            className="w-full p-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          >
                            <option value="">-- เลือกประเภทเสา --</option>
                            {posts.map((group) => (
                              <optgroup key={group.category} label={group.category}>
                                {group.options.map((post) => (
                                  <option key={post.id} value={post.id}>
                                    {post.name} - {post.price ? `+${post.price} บาท` : 'ไม่มีค่าใช้จ่ายเพิ่ม'}
                                  </option>
                                ))}
                              </optgroup>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>

                    {/* คอลัมน์ที่ 3 - เพิ่มฝ้าสำหรับ L+ */}
                    {selectedSize === 'L+' && (
                      <div className="bg-amber-50 rounded-lg border border-amber-200 p-4 space-y-3">
                        <div className="flex items-center space-x-3">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={useCeiling}
                              onChange={(e) => setUseCeiling(e.target.checked)}
                              className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                            />
                            <span className="ml-2 text-sm font-medium text-gray-700">เพิ่มงานฝ้า</span>
                            <span className="text-[10px] text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded-full ml-2">
                              L+ เท่านั้น
                            </span>
                          </label>
                        </div>
                        
                        {useCeiling && (
                          <div>
                            <select
                              value={selectedCeilingId || ''}
                              onChange={(e) => setSelectedCeilingId(e.target.value ? Number(e.target.value) : null)}
                              className="w-full p-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                            >
                              <option value="">-- เลือกประเภทฝ้า --</option>
                              {ceilings.map((ceiling) => (
                                <option key={ceiling.id} value={ceiling.id}>
                                  {ceiling.name} - {ceiling.price ? `+${ceiling.price} บาท` : 'ไม่มีค่าใช้จ่ายเพิ่ม'}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Divider */}
            <div className="border-t border-gray-100"></div>
          </div>

          {/* Additional Options - การ์ดแยก */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-800 mb-3 flex items-center">
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
              ตัวเลือกเพิ่มเติม
              <span className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-full ml-2">
                ไม่บังคับ
              </span>
            </h3>
            <AdditionalOptions
              useCeiling={selectedSize === 'L+' ? false : useCeiling}
              useLouver={useLouver}
              useGutter={useGutter}
              selectedCeilingId={selectedSize === 'L+' ? null : selectedCeilingId}
              selectedLouverId={selectedLouverId}
              selectedGutterId={selectedGutterId}
              onUseCeilingChange={selectedSize === 'L+' ? () => {} : setUseCeiling}
              onUseLouverChange={setUseLouver}
              onUseGutterChange={setUseGutter}
              onCeilingChange={selectedSize === 'L+' ? () => {} : setSelectedCeilingId}
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
              usePost={false}
              selectedPostId={null}
              onUsePostChange={() => {}}
              onPostChange={() => {}}
              useFoundation={useFoundation}
              selectedFoundationId={selectedFoundationId}
              onUseFoundationChange={setUseFoundation}
              onFoundationChange={setSelectedFoundationId}
              useColor={false}
              selectedColorId={null}
              onUseColorChange={() => {}}
              onColorChange={() => {}}
            />
          </div>

          {/* Calculate Button Section - ย้ายมาล่างสุด */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-6 h-6 bg-orange-600 text-white rounded-full text-xs font-medium">
                  3
                </div>
                <h3 className="text-sm font-medium text-gray-800">
                  🧮 คำนวณราคา
                </h3>
              </div>
              {canCalculate && (
                <span className="text-[10px] text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center">
                  ✓ พร้อมคำนวณ
                </span>
              )}
            </div>
            <Button
              variant="primary"
              size="lg"
              onClick={handleCalculate}
              disabled={!canCalculate}
              className={`w-full transition-all duration-200 ${
                canCalculate 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1' 
                  : ''
              }`}
            >
              {result ? '🔄 คำนวณใหม่' : '🧮 คำนวณราคา'}
            </Button>
          </div>
        </div>

        {/* Right Column - Compact Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-4 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 px-4 py-3 border-b border-gray-200">
              <h3 className="text-md font-semibold text-gray-900 flex items-center">
                📋 สรุปรายการ
              </h3>
            </div>
            
            <div className="p-4">
              {selectedMaterial && (
                <div className="mb-3">
                  <PriceDisplay
                    material={selectedMaterial}
                    selectedSize={selectedSize}
                    width={width}
                    length={length}
                  />
                </div>
              )}

              {result ? (
                <>
                  <ResultDisplay result={result} />
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 text-center">
                      <span className="text-xs text-gray-600 block mb-1">ราคารวมทั้งหมด</span>
                      <div className="font-bold text-2xl text-blue-600 mb-1">
                        {formatPrice(result.totalCost)} ฿
                      </div>
                      <span className="text-[10px] text-gray-500">รวม VAT แล้ว</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-3">📊</div>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    กรอกข้อมูลด้านซ้าย<br />
                    และกด 'คำนวณราคา'<br />
                    เพื่อดูสรุปใบเสนอราคา
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
