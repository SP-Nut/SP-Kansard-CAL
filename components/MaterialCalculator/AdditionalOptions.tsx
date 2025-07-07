import React from 'react'
import { Select } from '@/components/ui/Select'
import { ceilings } from '@/data/ceilings'
import { louvers } from '@/data/louvers'
import { gutters } from '@/data/gutters'

interface AdditionalOptionsProps {
  useCeiling: boolean
  useLouver: boolean
  useGutter: boolean
  selectedCeilingId: number | null
  selectedLouverId: number | null
  selectedGutterId: number | null
  onUseCeilingChange: (use: boolean) => void
  onUseLouverChange: (use: boolean) => void
  onUseGutterChange: (use: boolean) => void
  onCeilingChange: (ceilingId: number | null) => void
  onLouverChange: (louverId: number | null) => void
  onGutterChange: (gutterId: number | null) => void
}

export const AdditionalOptions: React.FC<AdditionalOptionsProps> = ({
  useCeiling,
  useLouver,
  useGutter,
  selectedCeilingId,
  selectedLouverId,
  selectedGutterId,
  onUseCeilingChange,
  onUseLouverChange,
  onUseGutterChange,
  onCeilingChange,
  onLouverChange,
  onGutterChange
}) => {
  const ceilingOptions = ceilings.map(ceiling => ({
    value: ceiling.id,
    label: `${ceiling.name} (${ceiling.price.toLocaleString()} ฿/ตร.ม.)`
  }))

  const louverOptions = louvers.map(louver => ({
    value: louver.id,
    label: `${louver.name} (${louver.price.toLocaleString()} ฿/ตร.ม.)`
  }))

  const gutterOptions = gutters.map(gutter => ({
    value: gutter.id,
    label: `${gutter.label} (${gutter.price.toLocaleString()} ฿/เมตร)`
  }))

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">ตัวเลือกเพิ่มเติม</h2>

      <div className="space-y-6">
        {/* ฝ้า */}
        <div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={useCeiling}
              onChange={(e) => onUseCeilingChange(e.target.checked)}
              className="w-5 h-5 text-indigo-600 rounded-md focus:ring-2"
            />
            <span className="text-gray-700 font-medium">เพิ่มงานฝ้า</span>
          </label>
          {useCeiling && (
            <div className="mt-3 ml-7">
              <Select
                options={ceilingOptions}
                placeholder="-- เลือกประเภทฝ้า --"
                value={selectedCeilingId || ''}
                onChange={(e) => onCeilingChange(e.target.value ? Number(e.target.value) : null)}
              />
            </div>
          )}
        </div>

        {/* ระแนง */}
        <div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={useLouver}
              onChange={(e) => onUseLouverChange(e.target.checked)}
              className="w-5 h-5 text-indigo-600 rounded-md focus:ring-2"
            />
            <span className="text-gray-700 font-medium">เพิ่มงานระแนง</span>
          </label>
          {useLouver && (
            <div className="mt-3 ml-7">
              <Select
                options={louverOptions}
                placeholder="-- เลือกประเภทระแนง --"
                value={selectedLouverId || ''}
                onChange={(e) => onLouverChange(e.target.value ? Number(e.target.value) : null)}
              />
            </div>
          )}
        </div>

        {/* ✅ รางน้ำ */}
        <div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={useGutter}
              onChange={(e) => onUseGutterChange(e.target.checked)}
              className="w-5 h-5 text-indigo-600 rounded-md focus:ring-2"
            />
            <span className="text-gray-700 font-medium">เพิ่มงานรางน้ำ</span>
          </label>
          {useGutter && (
            <div className="mt-3 ml-7">
              <Select
                options={gutterOptions}
                placeholder="-- เลือกรางน้ำ --"
                value={selectedGutterId || ''}
                onChange={(e) => onGutterChange(e.target.value ? Number(e.target.value) : null)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
