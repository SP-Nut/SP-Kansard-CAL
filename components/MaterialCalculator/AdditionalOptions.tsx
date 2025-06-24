import React from 'react'
import { Select } from '@/components/ui/Select'
import { ceilings } from '@/data/ceilings'
import { louvers } from '@/data/louvers'

interface AdditionalOptionsProps {
  useCeiling: boolean
  useLouver: boolean
  selectedCeilingId: number | null
  selectedLouverId: number | null
  onUseCeilingChange: (use: boolean) => void
  onUseLouverChange: (use: boolean) => void
  onCeilingChange: (ceilingId: number | null) => void
  onLouverChange: (louverId: number | null) => void
}

export const AdditionalOptions: React.FC<AdditionalOptionsProps> = ({
  useCeiling,
  useLouver,
  selectedCeilingId,
  selectedLouverId,
  onUseCeilingChange,
  onUseLouverChange,
  onCeilingChange,
  onLouverChange
}) => {
  const ceilingOptions = ceilings.map(ceiling => ({
    value: ceiling.id,
    label: `${ceiling.name} (${ceiling.price.toLocaleString()} ฿/ตร.ม.)`
  }))

  const louverOptions = louvers.map(louver => ({
    value: louver.id,
    label: `${louver.name} (${louver.price.toLocaleString()} ฿/ตร.ม.)`
  }))

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">ตัวเลือกเพิ่มเติม</h2>
      
      <div className="space-y-6">
        {/* Ceiling Option */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <input 
              type="checkbox" 
              id="ceiling-checkbox"
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 focus:ring-2"
              checked={useCeiling} 
              onChange={(e) => onUseCeilingChange(e.target.checked)}
            />
            <label 
              htmlFor="ceiling-checkbox" 
              className="text-lg font-semibold text-gray-700 cursor-pointer"
            >
              เพิ่มงานฝ้า
            </label>
          </div>
          
          {useCeiling && (
            <div className="ml-8">
              <Select
                options={ceilingOptions}
                placeholder="-- เลือกประเภทฝ้า --"
                value={selectedCeilingId || ''}
                onChange={(e) => onCeilingChange(e.target.value ? Number(e.target.value) : null)}
              />
            </div>
          )}
        </div>

        {/* Louver Option */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <input 
              type="checkbox" 
              id="louver-checkbox"
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 focus:ring-2"
              checked={useLouver} 
              onChange={(e) => onUseLouverChange(e.target.checked)}
            />
            <label 
              htmlFor="louver-checkbox" 
              className="text-lg font-semibold text-gray-700 cursor-pointer"
            >
              เพิ่มงานระแนง
            </label>
          </div>
          
          {useLouver && (
            <div className="ml-8">
              <Select
                options={louverOptions}
                placeholder="-- เลือกประเภทระแนง --"
                value={selectedLouverId || ''}
                onChange={(e) => onLouverChange(e.target.value ? Number(e.target.value) : null)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Summary of selected options */}
      {(useCeiling || useLouver) && (
        <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
          <h4 className="font-semibold text-orange-800 mb-2">ตัวเลือกที่เลือก:</h4>
          <ul className="space-y-1 text-sm text-orange-700">
            {useCeiling && selectedCeilingId && (
              <li>• ฝ้า: {ceilings.find(c => c.id === selectedCeilingId)?.name}</li>
            )}
            {useLouver && selectedLouverId && (
              <li>• ระแนง: {louvers.find(l => l.id === selectedLouverId)?.name}</li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}