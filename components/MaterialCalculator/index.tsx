'use client'

import React, { useState, useEffect } from 'react'
import { MaterialType, StructureSize, CalculationResult } from '@/types'
import { translucentMaterials, opaqueMaterials } from '@/data/materials'
import { ceilings } from '@/data/ceilings'
import { louvers } from '@/data/louvers'
import { calculateTotalPrice, formatPrice } from '@/utils/calculations'
import { ThemeToggle } from '@/components/ThemeToggle'

const STRUCTURE_SIZES: StructureSize[] = ['M', 'M+', 'L', 'L+', 'Stainless_S', 'Stainless_M']

export const MaterialCalculator: React.FC = () => {
  const [materialType, setMaterialType] = useState<MaterialType>('translucent')
  const [selectedMaterialId, setSelectedMaterialId] = useState<number | null>(null)
  const [selectedSize, setSelectedSize] = useState<StructureSize>('M')
  const [width, setWidth] = useState<string>('')
  const [length, setLength] = useState<string>('')
  const [useCeiling, setUseCeiling] = useState<boolean>(false)
  const [useLouver, setUseLouver] = useState<boolean>(false)
  const [selectedCeilingId, setSelectedCeilingId] = useState<number | null>(null)
  const [selectedLouverId, setSelectedLouverId] = useState<number | null>(null)
  const [result, setResult] = useState<CalculationResult | null>(null)

  const currentMaterials = materialType === 'translucent' ? translucentMaterials : opaqueMaterials
  const selectedMaterial = currentMaterials.find(m => m.id === selectedMaterialId) || null
  const selectedCeiling = selectedCeilingId ? ceilings.find(c => c.id === selectedCeilingId) : undefined
  const selectedLouver = selectedLouverId ? louvers.find(l => l.id === selectedLouverId) : undefined
  const currentPrice = selectedMaterial ? selectedMaterial.prices[selectedSize] : null
  const area = width && length ? parseFloat(width) * parseFloat(length) : 0

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

  const handleCalculate = () => {
    const w = parseFloat(width)
    const l = parseFloat(length)
    
    if (!selectedMaterial || isNaN(w) || isNaN(l) || w <= 0 || l <= 0) {
      return
    }

    const materialPrice = selectedMaterial.prices[selectedSize]
    if (materialPrice === null) {
      return
    }

    try {
      const calculationResult = calculateTotalPrice({
        material: selectedMaterial,
        structureSize: selectedSize,
        width: w,
        length: l,
        ceiling: selectedCeiling,
        louver: selectedLouver
      })
      setResult(calculationResult)
    } catch (error) {
      // Silent error handling
    }
  }

  const canCalculate = selectedMaterial && width && length && 
    parseFloat(width) > 0 && parseFloat(length) > 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 p-6 transition-colors duration-300">
      {/* Theme Toggle */}
      <ThemeToggle />
      
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-6 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-3 transition-colors">ระบบคำนวณราคาวัสดุ</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 transition-colors">เครื่องมือคำนวณราคาแม่นยำ ใช้งานง่าย</p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Left Panel - Form */}
          <div className="lg:col-span-3">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 dark:border-gray-700/50 p-8 transition-colors">
              
              {/* Material Type Toggle */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 transition-colors">ประเภทวัสดุ</h2>
                <div className="inline-flex bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-1.5 shadow-inner transition-colors">
                  <button
                    onClick={() => setMaterialType('translucent')}
                    className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      materialType === 'translucent'
                        ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-lg transform scale-105'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
                    }`}
                  >
                    วัสดุโปร่งแสง
                  </button>
                  <button
                    onClick={() => setMaterialType('opaque')}
                    className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      materialType === 'opaque'
                        ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-lg transform scale-105'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
                    }`}
                  >
                    วัสดุทึบแสง
                  </button>
                </div>
              </div>

              {/* Material & Size Selection */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 transition-colors">เลือกวัสดุ</label>
                  <select 
                    className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 focus:border-blue-500 dark:focus:border-blue-400 transition-all bg-white/80 dark:bg-gray-700/80 shadow-sm hover:shadow-md text-gray-900 dark:text-white"
                    value={selectedMaterialId || ''} 
                    onChange={e => setSelectedMaterialId(e.target.value ? Number(e.target.value) : null)}
                  >
                    <option value="">เลือกวัสดุที่ต้องการ...</option>
                    {currentMaterials.map(material => (
                      <option key={material.id} value={material.id}>
                        {material.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 transition-colors">ขนาดโครงสร้าง</label>
                  <select 
                    className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 focus:border-blue-500 dark:focus:border-blue-400 transition-all bg-white/80 dark:bg-gray-700/80 shadow-sm hover:shadow-md text-gray-900 dark:text-white"
                    value={selectedSize} 
                    onChange={e => setSelectedSize(e.target.value as StructureSize)}
                  >
                    {STRUCTURE_SIZES.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dimensions */}
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 transition-colors">ความกว้าง (ม.)</label>
                  <input 
                    type="number" 
                    className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 focus:border-blue-500 dark:focus:border-blue-400 transition-all bg-white/80 dark:bg-gray-700/80 shadow-sm hover:shadow-md text-gray-900 dark:text-white"
                    placeholder="0.00"
                    value={width} 
                    onChange={e => setWidth(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 transition-colors">ความยาว (ม.)</label>
                  <input 
                    type="number" 
                    className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 focus:border-blue-500 dark:focus:border-blue-400 transition-all bg-white/80 dark:bg-gray-700/80 shadow-sm hover:shadow-md text-gray-900 dark:text-white"
                    placeholder="0.00"
                    value={length} 
                    onChange={e => setLength(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 transition-colors">พื้นที่ (ตร.ม.)</label>
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/50 dark:to-pink-900/50 border-2 border-purple-200 dark:border-purple-700 rounded-2xl px-4 py-4 text-purple-800 dark:text-purple-300 font-bold text-center shadow-sm transition-colors">
                    {area > 0 ? area.toFixed(2) : '0.00'}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 transition-colors">ราคา/ตร.ม.</label>
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/50 dark:to-teal-900/50 border-2 border-emerald-200 dark:border-emerald-700 rounded-2xl px-4 py-4 text-emerald-800 dark:text-emerald-300 font-bold text-center shadow-sm transition-colors">
                    {currentPrice ? `${formatPrice(currentPrice)} ฿` : '—'}
                  </div>
                </div>
              </div>

              {/* Additional Options */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                
                {/* Ceiling */}
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/30 dark:to-amber-900/30 rounded-2xl p-6 border border-orange-200 dark:border-orange-700 transition-colors">
                  <label className="flex items-center mb-4">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 text-orange-600 border-orange-300 dark:border-orange-600 rounded-lg focus:ring-orange-500 mr-3"
                      checked={useCeiling} 
                      onChange={e => setUseCeiling(e.target.checked)}
                    />
                    <span className="text-lg font-semibold text-orange-800 dark:text-orange-300 flex items-center gap-2 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18m-9 5h9" />
                      </svg>
                      เพิ่มงานฝ้า
                    </span>
                  </label>
                  <select 
                    disabled={!useCeiling}
                    className="w-full px-4 py-3 border-2 border-orange-200 dark:border-orange-600 rounded-xl disabled:bg-orange-100 dark:disabled:bg-orange-900/30 disabled:text-orange-400 dark:disabled:text-orange-500 focus:ring-4 focus:ring-orange-100 dark:focus:ring-orange-900 focus:border-orange-500 dark:focus:border-orange-400 transition-all bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-white"
                    value={selectedCeilingId || ''} 
                    onChange={e => setSelectedCeilingId(e.target.value ? Number(e.target.value) : null)}
                  >
                    <option value="">เลือกประเภทฝ้า...</option>
                    {ceilings.map(ceiling => (
                      <option key={ceiling.id} value={ceiling.id}>
                        {ceiling.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Louver */}
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 rounded-2xl p-6 border border-indigo-200 dark:border-indigo-700 transition-colors">
                  <label className="flex items-center mb-4">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 text-indigo-600 border-indigo-300 dark:border-indigo-600 rounded-lg focus:ring-indigo-500 mr-3"
                      checked={useLouver} 
                      onChange={e => setUseLouver(e.target.checked)}
                    />
                    <span className="text-lg font-semibold text-indigo-800 dark:text-indigo-300 flex items-center gap-2 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                      เพิ่มงานระแนง
                    </span>
                  </label>
                  <select 
                    disabled={!useLouver}
                    className="w-full px-4 py-3 border-2 border-indigo-200 dark:border-indigo-600 rounded-xl disabled:bg-indigo-100 dark:disabled:bg-indigo-900/30 disabled:text-indigo-400 dark:disabled:text-indigo-500 focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-900 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-white"
                    value={selectedLouverId || ''} 
                    onChange={e => setSelectedLouverId(e.target.value ? Number(e.target.value) : null)}
                  >
                    <option value="">เลือกประเภทระแนง...</option>
                    {louvers.map(louver => (
                      <option key={louver.id} value={louver.id}>
                        {louver.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Calculate Button */}
              <div className="text-center mb-8">
                <button
                  onClick={handleCalculate}
                  disabled={!canCalculate}
                  className={`group relative px-12 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                    canCalculate 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-2xl transform hover:scale-105' 
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    คำนวณราคาทั้งหมด
                  </span>
                </button>
              </div>

              {/* Calculation Steps */}
              {result && (
                <div className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-800/50 rounded-2xl border-2 border-slate-200 dark:border-slate-600 p-6 transition-colors">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-3 transition-colors">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    รายละเอียดการคำนวณ
                  </h3>
                  <div className="bg-white dark:bg-gray-700 rounded-xl p-5 border border-slate-200 dark:border-slate-600 shadow-sm transition-colors">
                    <pre className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line font-mono leading-relaxed transition-colors">
                      {result.steps}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Results */}
          <div className="space-y-6">
            
            {/* Price Table */}
            {selectedMaterial && (
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 dark:border-gray-700/50 p-6 transition-colors">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-5 flex items-center gap-3 transition-colors">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  ราคาตามขนาด
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {STRUCTURE_SIZES.map(size => {
                    const price = selectedMaterial.prices[size]
                    const isSelected = size === selectedSize
                    return (
                      <div key={size} className={`flex justify-between py-3 px-4 rounded-xl text-sm transition-all duration-200 ${
                        isSelected 
                          ? 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/50 dark:to-indigo-900/50 border-2 border-blue-300 dark:border-blue-600 font-bold shadow-md transform scale-105' 
                          : 'bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-600/50 border border-gray-200 dark:border-gray-600 hover:shadow-sm'
                      }`}>
                        <span className={isSelected ? 'text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'}>{size}</span>
                        <span className={isSelected ? 'text-blue-700 dark:text-blue-300' : 'text-gray-900 dark:text-white'}>
                          {price ? `${formatPrice(price)} ฿` : '—'}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Total Price */}
            {result ? (
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl shadow-xl p-8 text-white">
                <div className="text-center">
                  <h3 className="text-lg font-bold mb-4 flex items-center justify-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    ราคารวมทั้งหมด
                  </h3>
                  <div className="text-4xl font-black mb-3">
                    {formatPrice(result.totalCost)} ฿
                  </div>
                  <div className="text-green-100 text-lg">ราคาโดยประมาณ</div>
                </div>
              </div>
            ) : (
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 dark:border-gray-700/50 p-8 text-center transition-colors">
                <div className="text-6xl mb-4">💰</div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2 transition-colors">พร้อมคำนวณราคา</h3>
                <p className="text-gray-500 dark:text-gray-400 transition-colors">กรอกข้อมูลและกดปุ่มคำนวณ</p>
              </div>
            )}

            {/* Breakdown */}
            {result && (
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 dark:border-gray-700/50 p-6 transition-colors">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-5 flex items-center gap-3 transition-colors">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v1.95a1 1 0 01-.293.707l-1.414 1.414a1 1 0 000 1.414L5.207 14.35c.195.195.293.456.293.707V17a2 2 0 002 2h2M9 5a2 2 0 012 2v.707a1 1 0 01-.293.707L9.293 9.828a2 2 0 000 2.828l1.414 1.415A1 1 0 0111 14.657V17a2 2 0 002 2h2M9 5V3a2 2 0 012-2h0a2 2 0 012 2v2M7 3h10" />
                    </svg>
                  </div>
                  รายละเอียดค่าใช้จ่าย
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between py-3 px-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600 transition-colors">
                    <span className="text-gray-700 dark:text-gray-300 font-medium transition-colors">วัสดุหลังคา</span>
                    <span className="font-bold text-gray-900 dark:text-white transition-colors">{formatPrice(result.materialCost)} ฿</span>
                  </div>
                  {result.ceilingCost && (
                    <div className="flex justify-between py-3 px-4 bg-orange-50 dark:bg-orange-900/30 rounded-xl border border-orange-200 dark:border-orange-700 transition-colors">
                      <span className="text-orange-700 dark:text-orange-300 font-medium transition-colors">งานฝ้า</span>
                      <span className="font-bold text-orange-900 dark:text-orange-200 transition-colors">{formatPrice(result.ceilingCost)} ฿</span>
                    </div>
                  )}
                  {result.louverCost && (
                    <div className="flex justify-between py-3 px-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl border border-indigo-200 dark:border-indigo-700 transition-colors">
                      <span className="text-indigo-700 dark:text-indigo-300 font-medium transition-colors">งานระแนง</span>
                      <span className="font-bold text-indigo-900 dark:text-indigo-200 transition-colors">{formatPrice(result.louverCost)} ฿</span>
                    </div>
                  )}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-4 border-2 border-green-200 dark:border-green-700 transition-colors">
                    <div className="flex justify-between font-bold text-xl text-green-700 dark:text-green-300 transition-colors">
                      <span>รวมทั้งหมด</span>
                      <span>{formatPrice(result.totalCost)} ฿</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}