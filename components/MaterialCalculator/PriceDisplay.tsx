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
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">ราคาต่อตารางเมตร</h3>
        <p className="text-gray-500">กรุณาเลือกวัสดุก่อน</p>
      </div>
    )
  }

  const currentPrice = material.prices[selectedSize]

  return (
    <div className="space-y-6">
      {/* Current Selected Price */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
        <h3 className="text-lg font-medium opacity-90 mb-2">ราคาที่เลือก</h3>
        <div className="text-3xl font-bold">
          {currentPrice !== null ? `${formatPrice(currentPrice)} ฿` : 'ไม่มีราคา'}
        </div>
        <div className="text-blue-100 text-sm mt-1">ต่อตารางเมตร • ขนาด {selectedSize}</div>
      </div>

      {/* Price Table */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">ราคาตามขนาดโครงสร้าง</h3>
        <div className="space-y-2">
          {STRUCTURE_SIZES.map(size => {
            const price = material.prices[size]
            const isSelected = size === selectedSize
            
            return (
              <div 
                key={size} 
                className={`flex justify-between items-center p-3 rounded-lg transition-colors ${
                  isSelected 
                    ? 'bg-blue-50 border-2 border-blue-200' 
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <span className={`font-medium ${isSelected ? 'text-blue-700' : 'text-gray-700'}`}>
                  {size}
                </span>
                <span className={`font-bold ${isSelected ? 'text-blue-700' : 'text-gray-900'}`}>
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