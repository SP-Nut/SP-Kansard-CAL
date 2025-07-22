import React from 'react'
import { DashboardLayout } from '@/components/Layout/DashboardLayout'
import { PageHeader } from '@/components/Dashboard/PageHeader'
import { MaterialCalculator } from '@/components/MaterialCalculator'

export default function CalculatorPage() {
  return (
    <DashboardLayout>
      <PageHeader 
        title="คำนวณราคา"
        description="ประมาณการราคาและสร้างใบเสนอราคาโครงสร้างหลังคา"
      />
      <MaterialCalculator />
    </DashboardLayout>
  )
}
