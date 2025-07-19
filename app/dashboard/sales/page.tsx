'use client'

import React from 'react'
import { DashboardLayout } from '@/components/Layout/DashboardLayout'
import { PageHeader } from '@/components/Dashboard/PageHeader'
import { StatsCard } from '@/components/Dashboard/StatsCard'
import { 
  FiDollarSign, 
  FiTrendingUp, 
  FiShoppingCart,
  FiCalendar
} from 'react-icons/fi'

export default function SalesPage() {
  const salesStats = [
    {
      title: 'ยอดขายวันนี้',
      value: '฿125,000',
      change: '+15.2%',
      changeType: 'positive' as const,
      icon: <FiDollarSign className="w-6 h-6" />,
      color: 'green' as const
    },
    {
      title: 'ยอดขายเดือนนี้',
      value: '฿2,450,000',
      change: '+8.5%',
      changeType: 'positive' as const,
      icon: <FiTrendingUp className="w-6 h-6" />,
      color: 'blue' as const
    },
    {
      title: 'ออเดอร์เดือนนี้',
      value: '142',
      change: '+12',
      changeType: 'positive' as const,
      icon: <FiShoppingCart className="w-6 h-6" />,
      color: 'purple' as const
    },
    {
      title: 'เฉลี่ยต่อวัน',
      value: '฿128,947',
      change: '+5.2%',
      changeType: 'positive' as const,
      icon: <FiCalendar className="w-6 h-6" />,
      color: 'yellow' as const
    }
  ]

  return (
    <DashboardLayout>
      <PageHeader
        title="ยอดขาย"
        description="ติดตามยอดขายและประสิทธิภาพการขาย"
      />

      {/* Sales Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {salesStats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Sales Chart Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            ยอดขายรายเดือน
          </h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">
              กราฟยอดขายรายเดือน (Chart Component จะถูกเพิ่มในอนาคต)
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            ผลิตภัณฑ์ขายดี
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-900 dark:text-white">หลังคาอะคริลิค Shinkolite</span>
              <span className="font-semibold text-green-600">฿850,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-900 dark:text-white">หลังคาเหล็กเคลือบสี</span>
              <span className="font-semibold text-green-600">฿650,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-900 dark:text-white">รางน้ำสแตนเลส</span>
              <span className="font-semibold text-green-600">฿420,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-900 dark:text-white">ฝ้าอะลูมิเนียม</span>
              <span className="font-semibold text-green-600">฿380,000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Sales */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          การขายล่าสุด
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  วันที่
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  ลูกค้า
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  ผลิตภัณฑ์
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  จำนวนเงิน
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  สถานะ
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  2025-07-19
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  บริษัท ABC จำกัด
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  หลังคาอะคริลิค
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  ฿125,000
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                    ชำระแล้ว
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  2025-07-18
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  คุณสมชาย มั่นคง
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  รางน้ำสแตนเลส
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  ฿85,000
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                    รอชำระ
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}
