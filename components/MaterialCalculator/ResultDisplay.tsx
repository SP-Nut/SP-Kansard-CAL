import React from 'react'
import { CalculationResult } from '@/types'
import { formatPrice } from '@/utils/calculations'

interface ResultDisplayProps {
  result: CalculationResult | null
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  if (!result) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">ผลการคำนวณ</h3>
        <p className="text-sm text-gray-500">กรุณากรอกข้อมูลให้ครบถ้วนแล้วกดคำนวณ</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Total Price Display */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 text-center">
        <h3 className="text-sm text-gray-600 font-medium mb-1">ราคารวมทั้งหมด (โดยประมาณ)</h3>
        <div className="text-4xl font-bold text-gray-800">
          {formatPrice(result.totalCost)} ฿
        </div>
      </div>

      {/* Breakdown */}
      <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">รายละเอียดค่าใช้จ่าย</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-700">ค่าวัสดุหลังคา</span>
            <span className="font-semibold text-gray-900">
              {formatPrice(result.materialCost)} ฿
            </span>
          </div>

          {result.ceilingCost && (
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-700">ค่างานฝ้า</span>
              <span className="font-semibold text-gray-900">
                {formatPrice(result.ceilingCost)} ฿
              </span>
            </div>
          )}

          {result.louverCost && (
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-700">ค่างานระแนง</span>
              <span className="font-semibold text-gray-900">
                {formatPrice(result.louverCost)} ฿
              </span>
            </div>
          )}

          <div className="flex justify-between items-center py-3 bg-gray-50 rounded-lg px-4 mt-2">
            <span className="text-lg font-bold text-gray-800">รวมทั้งหมด</span>
            <span className="text-xl font-bold text-indigo-600">
              {formatPrice(result.totalCost)} ฿
            </span>
          </div>
        </div>
      </div>

      {/* Calculation Steps */}
      <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">ขั้นตอนการคำนวณ</h3>
        <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
          <pre className="text-sm text-gray-700 whitespace-pre-line font-mono">
            {result.steps}
          </pre>
        </div>
      </div>

      {/* Area Info */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 text-center">
        <p className="text-sm text-gray-500 font-medium">พื้นที่ใช้งาน</p>
        <p className="text-lg font-bold text-gray-800">
          {result.area.toFixed(2)} ตารางเมตร
        </p>
      </div>
    </div>
  )
}
