import React from 'react'
import { Material, StructureSize } from '@/types'
import { formatPrice } from '@/utils/calculations'

interface PriceDisplayProps {
  material: Material | null
  selectedSize: StructureSize
}

const STRUCTURE_SIZES: StructureSize[] = ['M', 'M+', 'L', 'L+', 'Stainless_S', 'Stainless_M']

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  material,
  selectedSize
}) => {
  if (!material) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">ราคาต่อตารางเมตร</h3>
        <p className="text-sm text-gray-500">กรุณาเลือกวัสดุก่อน</p>
      </div>
    )
  }

  const currentPrice = material.prices[selectedSize]

  return (
    <div className="space-y-6">
      {/* Selected Price */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 text-center">
        <h3 className="text-sm font-medium text-gray-600 mb-1">ราคาต่อตารางเมตร</h3>
        <div className="text-3xl font-bold text-gray-800">
          {currentPrice !== null ? `${formatPrice(currentPrice)} ฿` : 'ไม่มีราคา'}
        </div>
        <p className="text-xs text-gray-500 mt-1">ขนาดโครงสร้าง: <span className="font-medium">{selectedSize}</span></p>
      </div>

      {/* Price Table */}
      <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">ราคาตามขนาดโครงสร้าง</h3>
        <div className="space-y-2">
          {STRUCTURE_SIZES.map(size => {
            const price = material.prices[size]
            const isSelected = size === selectedSize

            return (
              <div
                key={size}
                className={`flex justify-between items-center p-3 rounded-lg border transition ${
                  isSelected
                    ? 'bg-indigo-50 border-indigo-200'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <span className={`text-sm font-medium ${isSelected ? 'text-indigo-700' : 'text-gray-700'}`}>
                  {size}
                </span>
                <span className={`text-sm font-bold ${isSelected ? 'text-indigo-700' : 'text-gray-900'}`}>
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
