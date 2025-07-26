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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <div className="space-y-6">
        {/* Modern Progress Indicator */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-4">
                <div className={`relative flex items-center justify-center w-12 h-12 rounded-full text-sm font-semibold transition-all duration-300 ${
                  selectedMaterial && width && length ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg' : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                }`}>
                  <span>1</span>
                  {selectedMaterial && width && length && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-gray-900">ข้อมูลโครงการ</div>
                  <div className="text-gray-600 text-xs">
                    {selectedMaterial && width && length ? 'ข้อมูลครบถ้วนแล้ว' : 'กรอกข้อมูลโครงการ'}
                  </div>
                </div>
              </div>
              
              <div className={`h-1 w-16 rounded-full transition-all duration-300 ${canCalculate ? 'bg-gradient-to-r from-emerald-400 to-teal-400' : 'bg-gray-200'}`}></div>
              
              <div className="flex items-center space-x-4">
                <div className={`relative flex items-center justify-center w-12 h-12 rounded-full text-sm font-semibold transition-all duration-300 ${
                  result ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg' : 
                  canCalculate ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg' : 'bg-gray-300 text-gray-500'
                }`}>
                  <span>2</span>
                  {result && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-gray-900">คำนวณราคา</div>
                  <div className="text-gray-600 text-xs">
                    {result ? 'คำนวณเสร็จสิ้น' : canCalculate ? 'พร้อมคำนวณ' : 'รอข้อมูลครบถ้วน'}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm font-semibold text-gray-900">
                {!selectedMaterial ? 'เริ่มต้นเลือกวัสดุ' : 
                 !width || !length ? 'กรอกขนาดให้ครบ' : 
                 !result ? 'พร้อมคำนวณราคา' : 'เสร็จสิ้นการคำนวณ'}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                ขั้นตอนที่ {!selectedMaterial || !width || !length ? '1' : '2'} จาก 2 ขั้นตอน
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Main Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
              <div className="p-8 space-y-8">
                {/* Dimensions Section */}
                <div className="group">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">ระบุขนาดโครงการ</h3>
                    <span className="ml-3 text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium">จำเป็น</span>
                  </div>
                  <DimensionInput
                    width={width}
                    length={length}
                    onWidthChange={setWidth}
                    onLengthChange={setLength}
                  />
                </div>
                
                {/* Elegant Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <div className="bg-white px-4">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                {/* Material Selection */}
                <div className="group">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">เลือกวัสดุและโครงสร้าง</h3>
                    <span className="ml-3 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">จำเป็น</span>
                  </div>
                  <MaterialSelector
                    materialType={materialType}
                    onMaterialTypeChange={setMaterialType}
                    selectedMaterialId={selectedMaterialId}
                    onMaterialChange={setSelectedMaterialId}
                    selectedSize={selectedSize}
                    onSizeChange={setSelectedSize}
                  />
                </div>

                {/* Material-specific Options */}
                {selectedMaterial && (
                  <>
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                      </div>
                      <div className="relative flex justify-center">
                        <div className="bg-white px-4">
                          <div className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="group">
                      <div className="flex items-center mb-6">
                        <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">ตัวเลือกพิเศษ</h3>
                        <span className="ml-3 text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-medium">แนะนำ</span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Color Selection */}
                        <div className="group bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
                          <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                              <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                              </svg>
                              <span className="text-sm font-semibold text-gray-800">เลือกสี</span>
                            </div>
                            <select
                              value={selectedColorId || ''}
                              onChange={(e) => {
                                const value = e.target.value || null;
                                setSelectedColorId(value);
                                setUseColor(!!value);
                              }}
                              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all duration-200"
                            >
                              <option value="">-- เลือกสี --</option>
                              {colorOptions.map((color) => (
                                <option key={color.id} value={color.id}>
                                  {color.name} - {color.price ? `+${color.price.toLocaleString()} ฿` : 'ไม่มีค่าใช้จ่ายเพิ่ม'}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Post Selection */}
                        <div className="group bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
                          <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                              <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                              </svg>
                              <span className="text-sm font-semibold text-gray-800">เพิ่มเสา</span>
                            </div>
                            <select
                              value={selectedPostId || ''}
                              onChange={(e) => {
                                const value = e.target.value || null;
                                setSelectedPostId(value);
                                setUsePost(!!value);
                              }}
                              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all duration-200"
                            >
                              <option value="">-- เลือกประเภทเสา --</option>
                              {posts.map((group) => (
                                <optgroup key={group.category} label={group.category}>
                                  {group.options.map((post) => (
                                    <option key={post.id} value={post.id}>
                                      {post.name} - {post.price ? `+${post.price.toLocaleString()} ฿` : 'ไม่มีค่าใช้จ่ายเพิ่ม'}
                                    </option>
                                  ))}
                                </optgroup>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Ceiling for L+ */}
                        {selectedSize === 'L+' && (
                          <div className="group bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
                            <div className="space-y-4">
                              <div className="flex items-center space-x-2">
                                <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                                </svg>
                                <span className="text-sm font-semibold text-gray-800">เพิ่มงานฝ้า</span>
                                <span className="text-xs text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full font-medium">
                                  L+ เท่านั้น
                                </span>
                              </div>
                              <select
                                value={selectedCeilingId || ''}
                                onChange={(e) => {
                                  const value = e.target.value ? Number(e.target.value) : null;
                                  setSelectedCeilingId(value);
                                  setUseCeiling(!!value);
                                }}
                                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all duration-200"
                              >
                                <option value="">-- เลือกประเภทฝ้า --</option>
                                {ceilings.map((ceiling) => (
                                  <option key={ceiling.id} value={ceiling.id}>
                                    {ceiling.name} - {ceiling.price ? `+${ceiling.price.toLocaleString()} ฿` : 'ไม่มีค่าใช้จ่ายเพิ่ม'}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Additional Options Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">ตัวเลือกเพิ่มเติม</h3>
                  <span className="ml-3 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">ไม่บังคับ</span>
                </div>
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
            </div>

            {/* Calculate Button Section */}
            <Button
              variant="primary"
              size="lg"
              onClick={handleCalculate}
              disabled={!canCalculate}
              className={`w-full transition-all duration-300 transform ${
                canCalculate 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-2xl hover:shadow-3xl hover:-translate-y-1 hover:scale-[1.02] font-bold text-lg py-4' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              } rounded-2xl`}
            >
              {result ? 'คำนวณใหม่' : 'คำนวณราคา'}
            </Button>
          </div>

          {/* Right Column - Modern Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-white/95 via-blue-50/80 to-indigo-50/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/30 sticky top-4 overflow-hidden">
              {/* Modern Header with Gradient */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white">สรุปรายการ</h3>
                </div>
                <div className="mt-2 h-0.5 bg-gradient-to-r from-white/30 to-transparent rounded-full"></div>
              </div>
              
              <div className="p-6">
                {result ? (
                  <>
                    <ResultDisplay result={result} />
                  </>
                ) : (
                  <div className="text-center py-12">
                    {/* Modern Empty State */}
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                    </div>
                    
                    <h4 className="font-bold text-gray-800 mb-3 text-lg">เริ่มต้นคำนวณราคา</h4>
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-4">
                      <p className="text-blue-700 text-sm leading-relaxed font-medium">
                        กรอกข้อมูลด้านซ้าย<br />
                        และกด 'คำนวณราคา'<br />
                        เพื่อดูสรุปใบเสนอราคา
                      </p>
                    </div>
                    
                    {/* Progress Indicators */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">ความคืบหน้า</span>
                        <span className="text-blue-600 font-medium">0%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-1.5 rounded-full w-0 transition-all duration-300"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
