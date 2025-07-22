import React from 'react'
import { Material, StructureSize } from '@/types'
import { formatPrice } from '@/utils/calculations'

interface PriceDisplayProps {
  material: Material | null
  selectedSize: StructureSize
  width?: string
  length?: string
}

const STRUCTURE_SIZES: StructureSize[] = ['M', 'M+', 'L', 'L+', 'Stainless_S', 'Stainless_M']

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  material,
  selectedSize,
  width,
  length
}) => {
  if (!material) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">ข้อมูลโครงการ</h3>
        <p className="text-sm text-gray-500">กรุณาเลือกวัสดุก่อน</p>
      </div>
    )
  }

  const currentPrice = material.prices[selectedSize]
  const w = parseFloat(width || '0')
  const l = parseFloat(length || '0')
  const area = w && l ? w * l : 0

  return (
    <div className="space-y-4">
      {/* Project Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-blue-800 mb-3 flex items-center">
          📐 ข้อมูลโครงการ
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-blue-600">วัสดุ:</span>
            <span className="text-xs font-medium text-blue-800">{material.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-blue-600">โครงสร้าง:</span>
            <span className="text-xs font-medium text-blue-800">{selectedSize}</span>
          </div>
          {width && length && (
            <>
              <div className="flex justify-between items-center">
                <span className="text-xs text-blue-600">ขนาด:</span>
                <span className="text-xs font-medium text-blue-800">{width} × {length} เมตร</span>
              </div>
              <div className="flex justify-between items-center border-t border-blue-200 pt-2 mt-2">
                <span className="text-xs text-blue-600">พื้นที่รวม:</span>
                <span className="text-sm font-bold text-blue-800">{area.toFixed(2)} ตร.ม.</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Current Price */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 text-center">
        <h3 className="text-sm font-medium text-gray-600 mb-1">ราคาต่อตารางเมตร</h3>
        <div className="text-2xl font-bold text-gray-800">
          {currentPrice !== null ? `${formatPrice(currentPrice)} ฿` : 'ไม่มีราคา'}
        </div>
        {area > 0 && currentPrice && (
          <div className="mt-2 pt-2 border-t border-gray-200">
            <div className="text-xs text-gray-500">ราคาประมาณ</div>
            <div className="text-lg font-semibold text-green-600">
              {formatPrice(currentPrice * area)} ฿
            </div>
          </div>
        )}
      </div>

      {/* Price Table */}
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">ราคาตามขนาดโครงสร้าง</h3>
        <div className="space-y-1">
          {STRUCTURE_SIZES.map(size => {
            const price = material.prices[size]
            const isSelected = size === selectedSize

            return (
              <div
                key={size}
                className={`flex justify-between items-center p-2 rounded-lg border transition text-xs ${
                  isSelected
                    ? 'bg-indigo-50 border-indigo-200'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <span className={`font-medium ${isSelected ? 'text-indigo-700' : 'text-gray-700'}`}>
                  {size}
                </span>
                <span className={`font-bold ${isSelected ? 'text-indigo-700' : 'text-gray-900'}`}>
                  {price !== null ? `${formatPrice(price)} ฿` : '—'}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
