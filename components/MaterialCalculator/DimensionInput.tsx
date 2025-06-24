import React from 'react'
import { Input } from '@/components/ui/Input'
import { formatArea } from '@/utils/calculations'

interface DimensionInputProps {
  width: string
  length: string
  onWidthChange: (value: string) => void
  onLengthChange: (value: string) => void
}

export const DimensionInput: React.FC<DimensionInputProps> = ({
  width,
  length,
  onWidthChange,
  onLengthChange
}) => {
  const area = width && length ? parseFloat(width) * parseFloat(length) : 0

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">ขนาดพื้นที่</h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        {/* Width Input */}
        <Input
          label="ความกว้าง (เมตร)"
          type="number"
          placeholder="0.00"
          value={width}
          onChange={(e) => onWidthChange(e.target.value)}
          min="0"
          step="0.01"
        />

        {/* Length Input */}
        <Input
          label="ความยาว (เมตร)"
          type="number"
          placeholder="0.00"
          value={length}
          onChange={(e) => onLengthChange(e.target.value)}
          min="0"
          step="0.01"
        />

        {/* Area Display */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            พื้นที่รวม (ตร.ม.)
          </label>
          <div className="bg-purple-50 border-2 border-purple-200 rounded-lg px-3 py-2 h-10 flex items-center">
            <span className="font-bold text-purple-800">
              {area > 0 ? formatArea(area) : '0.00'}
            </span>
          </div>
        </div>
      </div>

      {/* Area Highlight */}
      {area > 0 && (
        <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
          <div className="text-center">
            <p className="text-sm text-purple-600 font-medium">พื้นที่ที่คำนวณ</p>
            <p className="text-2xl font-bold text-purple-800">
              {formatArea(area)} ตารางเมตร
            </p>
          </div>
        </div>
      )}
    </div>
  )
}