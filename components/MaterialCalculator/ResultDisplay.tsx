'use client'

import React, { useEffect, useState } from 'react'
import { CalculationResult } from '@/types'
import { formatPrice } from '@/utils/calculations'
import { Button } from '@/components/ui/Button'

interface ResultDisplayProps {
  result: CalculationResult
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const [pdfText, setPdfText] = useState<string>('')

  useEffect(() => {
    if (!result) return
    
    let text = ''
    text += `ราคารวมทั้งหมด (โดยประมาณ): ${result.totalCost.toLocaleString()} ฿\n`
    text += '\n--- รายละเอียดค่าใช้จ่าย ---\n'
    if (result.materialCost) text += `ค่าวัสดุหลังคา: ${result.materialCost.toLocaleString()} ฿\n`
    if (result.ceilingCost) text += `ค่าฝ้า: ${result.ceilingCost.toLocaleString()} ฿\n`
    if (result.louverCost) text += `ค่าระแนง: ${result.louverCost.toLocaleString()} ฿\n`
    if (result.gutterCost) text += `ค่ารางน้ำ: ${result.gutterCost.toLocaleString()} ฿\n`
    if (result.electricityCost) text += `ค่าไฟฟ้า: ${result.electricityCost.toLocaleString()} ฿\n`
    if (result.railingExtraCost) text += `ค่างานราวกันตก: ${result.railingExtraCost.toLocaleString()} ฿\n`
    if (result.ventilatorCost) text += `ค่างานระบายอากาศ: ${result.ventilatorCost.toLocaleString()} ฿\n`
    if (result.postCost) text += `ค่าเสา: ${result.postCost.toLocaleString()} ฿\n`
    if (result.foundationCost) text += `ค่าฐานราก: ${result.foundationCost.toLocaleString()} ฿\n`
    if (result.colorCost) text += `ค่าสี: ${result.colorCost.toLocaleString()} ฿\n`
    text += '\n--- ขั้นตอนการคำนวณ ---\n'
    text += result.steps
    setPdfText(text)
  }, [result])

  if (!result) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">ผลการคำนวณ</h3>
        <p className="text-base text-gray-500">กรุณากรอกข้อมูลให้ครบถ้วนแล้วกดคำนวณ</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Total Price Display - Compact Design */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 text-center">
        <div className="flex items-center justify-center mb-2">
          <svg className="w-5 h-5 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
          <h3 className="text-base text-white font-medium">ราคารวมทั้งหมด (โดยประมาณ)</h3>
        </div>
        <div className="text-3xl font-bold text-white mb-1">
          {formatPrice(result.totalCost)} ฿
        </div>
        <div className="text-blue-100 text-sm">
          รวมภาษีมูลค่าเพิ่ม 7%
        </div>
      </div>

      {/* Breakdown - Compact Grid Design */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="text-base font-semibold text-gray-800">รายละเอียดค่าใช้จ่าย</h3>
          </div>
        </div>
        
        <div className="p-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center py-2 px-3 bg-blue-50 rounded-lg border border-blue-100">
              <span className="text-sm text-gray-700 font-medium">ค่าวัสดุหลังคา</span>
              <span className="font-bold text-gray-900 text-sm">
                {formatPrice(result.materialCost)} ฿
              </span>
            </div>
            
            {result.ceilingCost && (
              <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg border border-gray-100">
                <span className="text-sm text-gray-700 font-medium">ค่าฝ้า</span>
                <span className="font-bold text-gray-900 text-sm">
                  {formatPrice(result.ceilingCost)} ฿
                </span>
              </div>
            )}
            {result.louverCost && (
              <div className="flex justify-between items-center py-2 px-3 bg-blue-50 rounded-lg border border-blue-100">
                <span className="text-sm text-gray-700 font-medium">ค่าระแนง</span>
                <span className="font-bold text-gray-900 text-sm">
                  {formatPrice(result.louverCost)} ฿
                </span>
              </div>
            )}
            {result.gutterCost && (
              <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg border border-gray-100">
                <span className="text-sm text-gray-700 font-medium">ค่ารางน้ำ</span>
                <span className="font-bold text-gray-900 text-sm">
                  {formatPrice(result.gutterCost)} ฿
                </span>
              </div>
            )}
            {result.electricityCost && (
              <div className="flex justify-between items-center py-2 px-3 bg-blue-50 rounded-lg border border-blue-100">
                <span className="text-sm text-gray-700 font-medium">ค่าไฟฟ้า</span>
                <span className="font-bold text-gray-900 text-sm">
                  {formatPrice(result.electricityCost)} ฿
                </span>
              </div>
            )}
            {result.railingExtraCost && (
              <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg border border-gray-100">
                <span className="text-sm text-gray-700 font-medium">ค่างานราวกันตก</span>
                <span className="font-bold text-gray-900 text-sm">
                  {formatPrice(result.railingExtraCost)} ฿
                </span>
              </div>
            )}
            {result.ventilatorCost && (
              <div className="flex justify-between items-center py-2 px-3 bg-blue-50 rounded-lg border border-blue-100">
                <span className="text-sm text-gray-700 font-medium">ค่างานระบายอากาศ</span>
                <span className="font-bold text-gray-900 text-sm">
                  {formatPrice(result.ventilatorCost)} ฿
                </span>
              </div>
            )}
            {result.postCost && (
              <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg border border-gray-100">
                <span className="text-sm text-gray-700 font-medium">ค่าเสา</span>
                <span className="font-bold text-gray-900 text-sm">
                  {formatPrice(result.postCost)} ฿
                </span>
              </div>
            )}
            {result.foundationCost && (
              <div className="flex justify-between items-center py-2 px-3 bg-blue-50 rounded-lg border border-blue-100">
                <span className="text-sm text-gray-700 font-medium">ค่าฐานราก</span>
                <span className="font-bold text-gray-900 text-sm">
                  {formatPrice(result.foundationCost)} ฿
                </span>
              </div>
            )}
            {result.colorCost && (
              <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg border border-gray-100">
                <span className="text-sm text-gray-700 font-medium">ค่าสี</span>
                <span className="font-bold text-gray-900 text-sm">
                  {formatPrice(result.colorCost)} ฿
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Calculation Steps - Compact Design */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <h3 className="text-base font-semibold text-gray-800">ขั้นตอนการคำนวณ</h3>
          </div>
        </div>
        <div className="p-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <pre className="text-xs text-gray-700 whitespace-pre-line font-mono leading-relaxed">
              {result.steps}
            </pre>
          </div>
        </div>
      </div>

      {/* Save Button - Colorful Design */}
      <div className="flex justify-center">
        <Button
          variant="outline"
          size="sm"
          pdfContent={pdfText}
          pdfTitle={`สรุปผลรวมและขั้นตอนการคำนวณ`}
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-8 py-3 text-sm font-semibold rounded-xl"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          บันทึกรายงาน
        </Button>
      </div>
    </div>
  )
}
