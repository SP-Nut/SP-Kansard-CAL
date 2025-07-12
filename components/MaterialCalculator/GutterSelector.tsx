// components/MaterialCalculator/GutterSelector.tsx

import React from 'react'
import { GutterItem } from '@/data/gutters'
import { Select } from '@/components/ui/Select'

interface GutterSelectorProps {
  gutters: GutterItem[]
  selectedId: number | null
  onChange: (id: number | null) => void
}

export const GutterSelector: React.FC<GutterSelectorProps> = ({
  gutters,
  selectedId,
  onChange
}) => {
  return (
    <Select
      label="เลือกรางน้ำ"
      options={gutters.map((g) => ({
        value: g.id,
        label: `${g.label} (${g.price.toLocaleString()}฿/เมตร)`
      }))}
      placeholder="เลือกรางน้ำ"
      value={selectedId ?? ''}
      onChange={(e) => onChange(Number(e.target.value))}
    />
  )
}
