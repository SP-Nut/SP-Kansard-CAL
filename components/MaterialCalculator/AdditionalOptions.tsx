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
    <div className="space-y-4">
      {/* Dropdown Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* งานระแนง */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all duration-200">
          <div className="flex items-center space-x-2 mb-3">
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            <span className="text-sm font-semibold text-gray-800">งานระแนง</span>
          </div>
          <Select
            options={[
              { value: '', label: '-- ไม่ต้องการ --' },
              ...louverOptions
            ]}
            placeholder="เลือกประเภทระแนง"
            value={selectedLouverId || ''}
            onChange={(e) => {
              const value = e.target.value ? Number(e.target.value) : null;
              onLouverChange(value);
              onUseLouverChange(!!value);
            }}
            fullWidth
          />
        </div>

        {/* งานไฟฟ้า */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all duration-200">
          <div className="flex items-center space-x-2 mb-3">
            <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-sm font-semibold text-gray-800">งานไฟฟ้า</span>
          </div>
          <Select
            options={[
              { value: '', label: '-- ไม่ต้องการ --' },
              ...electricitySelectOptions
            ]}
            placeholder="เลือกงานไฟฟ้า"
            value={selectedElectricityId || ''}
            onChange={(e) => {
              const value = e.target.value || null;
              onElectricityChange(value);
              onUseElectricityChange(!!value);
            }}
            fullWidth
          />
        </div>

        {/* งานระบายอากาศ */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all duration-200">
          <div className="flex items-center space-x-2 mb-3">
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
            <span className="text-sm font-semibold text-gray-800">งานระบายอากาศ</span>
          </div>
          <Select
            options={[
              { value: '', label: '-- ไม่ต้องการ --' },
              ...ventilatorSelectOptions
            ]}
            placeholder="เลือกงานระบายอากาศ"
            value={selectedVentilatorId || ''}
            onChange={(e) => {
              const value = e.target.value || null;
              onVentilatorChange(value);
              onUseVentilatorChange(!!value);
            }}
            fullWidth
          />
        </div>

        {/* งานรางน้ำ */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all duration-200">
          <div className="flex items-center space-x-2 mb-3">
            <svg className="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
            <span className="text-sm font-semibold text-gray-800">งานรางน้ำ</span>
          </div>
          <Select
            options={[
              { value: '', label: '-- ไม่ต้องการ --' },
              ...gutterOptions
            ]}
            placeholder="เลือกรางน้ำ"
            value={selectedGutterId || ''}
            onChange={(e) => {
              const value = e.target.value ? Number(e.target.value) : null;
              onGutterChange(value);
              onUseGutterChange(!!value);
            }}
            fullWidth
          />
        </div>

        {/* งานราวกันตก */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all duration-200">
          <div className="flex items-center space-x-2 mb-3">
            <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-sm font-semibold text-gray-800">งานราวกันตก</span>
          </div>
          <Select
            options={[
              { value: '', label: '-- ไม่ต้องการ --' },
              ...railingExtraSelectOptions
            ]}
            placeholder="เลือกงานราวกันตก"
            value={selectedRailingExtraId || ''}
            onChange={(e) => {
              const value = e.target.value || null;
              onRailingExtraChange(value);
              onUseRailingExtraChange(!!value);
            }}
            fullWidth
          />
        </div>

        {/* ฐานราก */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all duration-200">
          <div className="flex items-center space-x-2 mb-3">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="text-sm font-semibold text-gray-800">ฐานราก</span>
          </div>
          <Select
            options={[
              { value: '', label: '-- ไม่ต้องการ --' },
              ...foundationSelectOptions
            ]}
            placeholder="เลือกฐานราก"
            value={selectedFoundationId || ''}
            onChange={(e) => {
              const value = e.target.value || null;
              onFoundationChange(value);
              onUseFoundationChange(!!value);
            }}
            fullWidth
          />
        </div>
      </div>
    </div>
  )
}
