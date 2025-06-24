import { MaterialCalculator } from '@/components/MaterialCalculator'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ระบบคำนวณราคาเบื้องต้น | Material Calculator',
  description: 'เครื่องมือคำนวณราคาวัสดุก่อสร้าง หลังคา ฝ้า และระแนง โดยประมาณ',
  keywords: 'คำนวณราคา, วัสดุก่อสร้าง, หลังคา, ฝ้า, ระแนง, ราคาโดยประมาณ',
}

export default function HomePage() {
  return (
    <main>
      <MaterialCalculator />
    </main>
  )
}