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
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Width */}
        <Input
          label="ความกว้าง (เมตร)"
          type="number"
          placeholder="0.00"
          value={width}
          onChange={(e) => onWidthChange(e.target.value)}
          min="0"
          step="0.01"
        />

        {/* Length */}
        <Input
          label="ความยาว (เมตร)"
          type="number"
          placeholder="0.00"
          value={length}
          onChange={(e) => onLengthChange(e.target.value)}
          min="0"
          step="0.01"
        />

        {/* Area display */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            พื้นที่รวม (ตร.ม.)
          </label>
            <div className="h-10 flex items-center px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-800 font-semibold">
              {area > 0 ? formatArea(area) : '0.00'}
            </div>
        </div>
      </div>
    </div>
  )
}