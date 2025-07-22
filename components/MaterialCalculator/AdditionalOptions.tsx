import React from 'react'
import { Select } from '@/components/ui/Select'
import { ceilings } from '@/data/ceilings'
import { louvers } from '@/data/louvers'
import { gutters } from '@/data/gutters'
import electricityOptions from '@/data/electricity'
import railingExtras from '@/data/railingExtras'
import ventilatorOptions from '@/data/ventilators'
import posts from '@/data/posts'
import foundations from '@/data/foundations'
import colorOptions from '@/data/colors'
import { FaCheckSquare, FaRegSquare } from 'react-icons/fa'

interface AdditionalOptionsProps {
  useCeiling: boolean
  useLouver: boolean
  useGutter: boolean
  useElectricity: boolean
  useRailingExtra: boolean
  useVentilator: boolean
  usePost: boolean
  useFoundation: boolean
  useColor: boolean
  selectedCeilingId: number | null
  selectedLouverId: number | null
  selectedGutterId: number | null
  selectedElectricityId: string | null
  selectedRailingExtraId: string | null
  selectedVentilatorId: string | null
  selectedPostId: string | null
  selectedFoundationId: string | null
  selectedColorId: string | null
  onUseCeilingChange: (use: boolean) => void
  onUseLouverChange: (use: boolean) => void
  onUseGutterChange: (use: boolean) => void
  onUseElectricityChange: (use: boolean) => void
  onUseRailingExtraChange: (use: boolean) => void
  onUseVentilatorChange: (use: boolean) => void
  onUsePostChange: (use: boolean) => void
  onUseFoundationChange: (use: boolean) => void
  onUseColorChange: (use: boolean) => void
  onCeilingChange: (ceilingId: number | null) => void
  onLouverChange: (louverId: number | null) => void
  onGutterChange: (gutterId: number | null) => void
  onElectricityChange: (electricityId: string | null) => void
  onRailingExtraChange: (railingExtraId: string | null) => void
  onVentilatorChange: (ventilatorId: string | null) => void
  onPostChange: (postId: string | null) => void
  onFoundationChange: (foundationId: string | null) => void
  onColorChange: (colorId: string | null) => void
}

export const AdditionalOptions: React.FC<AdditionalOptionsProps> = ({
  useCeiling,
  useLouver,
  useGutter,
  useElectricity,
  useRailingExtra,
  useVentilator,
  usePost,
  useFoundation,
  useColor,
  selectedCeilingId,
  selectedLouverId,
  selectedGutterId,
  selectedElectricityId,
  selectedRailingExtraId,
  selectedVentilatorId,
  selectedPostId,
  selectedFoundationId,
  selectedColorId,
  onUseCeilingChange,
  onUseLouverChange,
  onUseGutterChange,
  onUseElectricityChange,
  onUseRailingExtraChange,
  onUseVentilatorChange,
  onUsePostChange,
  onUseFoundationChange,
  onUseColorChange,
  onCeilingChange,
  onLouverChange,
  onGutterChange,
  onElectricityChange,
  onRailingExtraChange,
  onVentilatorChange,
  onPostChange,
  onFoundationChange,
  onColorChange
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

  const electricitySelectOptions = electricityOptions.map(opt => ({
    value: opt.id,
    label: `${opt.name} (${opt.price.toLocaleString()} ฿)`
  }))

  const railingExtraSelectOptions = railingExtras.map(opt => ({
    value: opt.id,
    label: `${opt.name} (${opt.price.toLocaleString()} ฿)`
  }))

  const ventilatorSelectOptions = ventilatorOptions.map(opt => ({
    value: opt.id,
    label: `${opt.name} (${opt.price.toLocaleString()} ฿)`
  }))

  // Flatten post options for dropdown
  const postSelectOptions = posts.flatMap(group => group.options.map(opt => ({
    value: opt.id,
    label: `${opt.name} (${opt.price.toLocaleString()} ฿)`
  })))
  const foundationSelectOptions = foundations.flatMap(group => group.options.map(opt => ({
    value: opt.id,
    label: `${opt.name} (${opt.price.toLocaleString()} ฿)`
  })))
  const colorSelectOptions = colorOptions.map(opt => ({
    value: opt.id,
    label: `${opt.name} (${opt.price.toLocaleString()} ฿)`
  }))

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ตัวเลือกแต่ละกลุ่ม */}
        {[{
          label: 'เพิ่มงานฝ้า',
          checked: useCeiling,
          onChange: onUseCeilingChange,
          select: useCeiling && (
            <Select
              options={ceilingOptions}
              placeholder="-- เลือกประเภทฝ้า --"
              value={selectedCeilingId || ''}
              onChange={(e) => onCeilingChange(e.target.value ? Number(e.target.value) : null)}
            />
            )
          }, {
            label: 'เพิ่มงานระแนง',
            checked: useLouver,
            onChange: onUseLouverChange,
            select: useLouver && (
              <Select
                options={louverOptions}
                placeholder="-- เลือกประเภทระแนง --"
                value={selectedLouverId || ''}
                onChange={(e) => onLouverChange(e.target.value ? Number(e.target.value) : null)}
              />
            )
          }, {
            label: 'เพิ่มงานรางน้ำ',
            checked: useGutter,
            onChange: onUseGutterChange,
            select: useGutter && (
              <Select
                options={gutterOptions}
                placeholder="-- เลือกรางน้ำ --"
                value={selectedGutterId || ''}
                onChange={(e) => onGutterChange(e.target.value ? Number(e.target.value) : null)}
              />
            )
          }, {
            label: 'เพิ่มงานไฟฟ้า',
            checked: useElectricity,
            onChange: onUseElectricityChange,
            select: useElectricity && (
              <Select
                options={electricitySelectOptions}
                placeholder="-- เลือกงานไฟฟ้า --"
                value={selectedElectricityId || ''}
                onChange={(e) => onElectricityChange(e.target.value ? e.target.value : null)}
              />
            )
          }, {
            label: 'เพิ่มงานราวกันตก',
            checked: useRailingExtra,
            onChange: onUseRailingExtraChange,
            select: useRailingExtra && (
              <Select
                options={railingExtraSelectOptions}
                placeholder="-- เลือกงานราวกันตก --"
                value={selectedRailingExtraId || ''}
                onChange={(e) => onRailingExtraChange(e.target.value ? e.target.value : null)}
              />
            )
          }, {
            label: 'เพิ่มงานระบายอากาศ',
            checked: useVentilator,
            onChange: onUseVentilatorChange,
            select: useVentilator && (
              <Select
                options={ventilatorSelectOptions}
                placeholder="-- เลือกงานระบายอากาศ --"
                value={selectedVentilatorId || ''}
                onChange={(e) => onVentilatorChange(e.target.value ? e.target.value : null)}
              />
            )
          }, {
            label: 'เพิ่มเสา',
            checked: usePost,
            onChange: onUsePostChange,
            select: usePost && (
              <Select
                options={postSelectOptions}
                placeholder="-- เลือกเสา --"
                value={selectedPostId || ''}
                onChange={(e) => onPostChange(e.target.value ? e.target.value : null)}
              />
            )
          }, {
            label: 'เพิ่มฐานราก',
            checked: useFoundation,
            onChange: onUseFoundationChange,
            select: useFoundation && (
              <Select
                options={foundationSelectOptions}
                placeholder="-- เลือกฐานราก --"
                value={selectedFoundationId || ''}
                onChange={(e) => onFoundationChange(e.target.value ? e.target.value : null)}
              />
            )
          }, {
            label: 'เพิ่มสี',
            checked: useColor,
            onChange: onUseColorChange,
            select: useColor && (
              <Select
                options={colorSelectOptions}
                placeholder="-- เลือกสี --"
                value={selectedColorId || ''}
                onChange={(e) => onColorChange(e.target.value ? e.target.value : null)}
              />
            )
          }].map((item, idx) => (
            <div key={item.label} className="bg-gray-50 rounded-lg border border-gray-200 p-4 space-y-3">
              <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={(e) => item.onChange(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border border-gray-400 focus:ring-1 focus:ring-blue-400 focus:border-blue-600 bg-white"
                />
                <span>{item.label}</span>
              </label>
              {item.select && <div className="mt-2">{item.select}</div>}
            </div>
        ))}
      </div>
    </div>
  )
}
