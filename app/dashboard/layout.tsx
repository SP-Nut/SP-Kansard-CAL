import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard | SP Kansard Management System',
  description: 'ระบบจัดการงานก่อสร้าง ประมาณการราคา และติดตามโปรเจ็ค',
  keywords: 'dashboard, ระบบจัดการ, ก่อสร้าง, ประมาณการราคา, โปรเจ็ค',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
