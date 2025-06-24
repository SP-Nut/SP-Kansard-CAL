import React from 'react'
import { CalculationResult } from '@/types'
import { formatPrice } from '@/utils/calculations'

interface ResultDisplayProps {
  result: CalculationResult | null
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  if (!result) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">ผลการคำนวณ</h3>
        <p className="text-gray-500">กรุณากรอกข้อมูลให้ครบถ้วนแล้วกดคำนวณ</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Total Price Display */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-lg p-6 text-white">
        <div className="text-center">
          <h3 className="text-lg font-medium opacity-90 mb-2">ราคารวมทั้งหมด</h3>
          <div className="text-4xl font-bold mb-2">
            {formatPrice(result.totalCost)} ฿
          </div>
          <div className="text-green-100 text-sm">ราคาโดยประมาณ</div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">รายละเอียดค่าใช้จ่าย</h3>
        
        <div className="space-y-3">
          {/* Material Cost */}
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-700">ค่าวัสดุหลังคา</span>
            <span className="font-semibold text-gray-900">
              {formatPrice(result.materialCost)} ฿
            </span>
          </div>

          {/* Ceiling Cost */}
          {result.ceilingCost && (
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-700">ค่างานฝ้า</span>
              <span className="font-semibold text-gray-900">
                {formatPrice(result.ceilingCost)} ฿
              </span>
            </div>
          )}

          {/* Louver Cost */}
          {result.louverCost && (
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-700">ค่างานระแนง</span>
              <span className="font-semibold text-gray-900">
                {formatPrice(result.louverCost)} ฿
              </span>
            </div>
          )}

          {/* Total */}
          <div className="flex justify-between items-center py-3 bg-gray-50 rounded-lg px-4">
            <span className="text-lg font-bold text-gray-800">รวมทั้งหมด</span>
            <span className="text-xl font-bold text-green-600">
              {formatPrice(result.totalCost)} ฿
            </span>
          </div>
        </div>
      </div>

      {/* Calculation Steps */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">ขั้นตอนการคำนวณ</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <pre className="text-sm text-gray-700 whitespace-pre-line font-mono">
            {result.steps}
          </pre>
        </div>
      </div>

      {/* Area Info */}
      <div className="bg-blue-50 rounded-xl border border-blue-200 p-4">
        <div className="text-center">
          <p className="text-sm text-blue-600 font-medium">พื้นที่ใช้งาน</p>
          <p className="text-lg font-bold text-blue-800">
            {result.area.toFixed(2)} ตารางเมตร
          </p>
        </div>
      </div>
    </div>
  )
}