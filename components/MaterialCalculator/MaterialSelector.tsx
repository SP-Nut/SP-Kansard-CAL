import React from 'react'
import { Select } from '@/components/ui/Select'
import { MaterialType, StructureSize } from '@/types'
import { translucentMaterials, opaqueMaterials } from '@/data/materials'

interface MaterialSelectorProps {
  materialType: MaterialType
  onMaterialTypeChange: (type: MaterialType) => void
  selectedMaterialId: number | null
  onMaterialChange: (materialId: number | null) => void
  selectedSize: StructureSize
  onSizeChange: (size: StructureSize) => void
}

const STRUCTURE_SIZES: StructureSize[] = ['M', 'M+', 'L', 'L+', 'Stainless_S', 'Stainless_M']

export const MaterialSelector: React.FC<MaterialSelectorProps> = ({
  materialType,
  onMaterialTypeChange,
  selectedMaterialId,
  onMaterialChange,
  selectedSize,
  onSizeChange
}) => {
  const currentMaterials = materialType === 'translucent' ? translucentMaterials : opaqueMaterials
  
  const materialOptions = currentMaterials.map(material => ({
    value: material.id,
    label: material.name
  }))
  
  const sizeOptions = STRUCTURE_SIZES.map(size => ({
    value: size,
    label: size
  }))

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">เลือกวัสดุ</h2>

      {/* Material Type Toggle */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">ประเภทวัสดุ</label>
        <div className="inline-flex items-center bg-gray-100 p-1 rounded-xl shadow-inner border border-indigo-200">
          <button
            onClick={() => onMaterialTypeChange('translucent')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus:border-indigo-500 ${
              materialType === 'translucent'
                ? 'bg-white text-indigo-600 border-indigo-500 shadow'
                : 'text-gray-600 hover:bg-gray-200 border-transparent'
            }`}
          >
            วัสดุโปร่งแสง
          </button>
          <button
            onClick={() => onMaterialTypeChange('opaque')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus:border-indigo-500 ${
              materialType === 'opaque'
                ? 'bg-white text-indigo-600 border-indigo-500 shadow'
                : 'text-gray-600 hover:bg-gray-200 border-transparent'
            }`}
          >
            วัสดุทึบแสง
          </button>
        </div>
      </div>

      {/* Material & Size Select */}
      <div className="grid md:grid-cols-2 gap-6">
        <Select
          label="เลือกวัสดุ"
          options={materialOptions}
          placeholder="-- เลือกวัสดุ --"
          value={selectedMaterialId || ''}
          onChange={(e) => onMaterialChange(e.target.value ? Number(e.target.value) : null)}
        />
        
        <Select
          label="ขนาดโครงสร้าง"
          options={sizeOptions}
          value={selectedSize}
          onChange={(e) => onSizeChange(e.target.value as StructureSize)}
        />
      </div>
    </div>
  )
}
