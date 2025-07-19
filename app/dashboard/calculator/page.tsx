import React from 'react'
import { DashboardLayout } from '@/components/Layout/DashboardLayout'
import { MaterialCalculator } from '@/components/MaterialCalculator'

export default function CalculatorPage() {
  return (
    <DashboardLayout>
      <MaterialCalculator />
    </DashboardLayout>
  )
}
