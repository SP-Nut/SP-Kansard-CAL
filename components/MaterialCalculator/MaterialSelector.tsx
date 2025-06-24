import React from 'react'
import { Select } from '@/components/ui/Select'
import { MaterialType, Material, StructureSize } from '@/types'
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
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">เลือกวัสดุ</h2>
      
      {/* Material Type Selection */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">ประเภทวัสดุ</label>
        <div className="grid grid-cols-2 gap-4 max-w-md">
          <button
            onClick={() => onMaterialTypeChange('translucent')}
            className={`py-3 px-4 rounded-lg font-medium transition-all ${
              materialType === 'translucent' 
                ? 'bg-blue-500 text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            วัสดุโปร่งแสง
          </button>
          <button
            onClick={() => onMaterialTypeChange('opaque')}
            className={`py-3 px-4 rounded-lg font-medium transition-all ${
              materialType === 'opaque' 
                ? 'bg-blue-500 text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            วัสดุทึบแสง
          </button>
        </div>
      </div>

      {/* Material and Size Selection */}
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